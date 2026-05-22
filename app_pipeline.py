import sys
import re
import os
import fitz
import json
import torch
from datetime import datetime
from sentence_transformers import SentenceTransformer, util
from transformers import (
    pipeline,
    AutoTokenizer,
    AutoModelForTokenClassification,
)

#Configurations and Constants
HF_NER_MODEL = "shreyasshah707/skill-extractor"
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
NER_CONFIDENCE_THRESHOLD = 0.20
MATCH_THRESHOLD_PCT = 55.0

STOP_WORDS = {"and", "to", "the", "of", "in", "a", "with", "for", "on", "an", "at", "by"}
HIJACKER_WORDS = {"learning", "computing", "science", "technology", "platform", "context", "skills"}
PDF_NOISE = {"table", "figure", "page", "unit", "box", "chart", "module", "level"}

ROLE_MAP = {
    "1": {"role": "Data Scientist", "skills": ["Python", "SQL", "Machine Learning", "Data Visualization", "Statistics", "Communication"]},
    "2": {"role": "Machine Learning Engineer", "skills": ["Python", "Deep Learning", "Docker", "Machine Learning", "Mathematics", "Model Deployment"]},
    "3": {"role": "Cloud Architect", "skills": ["Cloud Computing", "AWS", "Azure", "Docker", "Kubernetes", "Linux", "Networking"]},
    "4": {"role": "Custom Role", "skills": []}
}

#Core Functions

def load_models():
    print("\n[1/4] Initializing AI Brain (Loading Models)...")
    tokenizer = AutoTokenizer.from_pretrained(HF_NER_MODEL)
    model = AutoModelForTokenClassification.from_pretrained(HF_NER_MODEL)
    ner_pipe = pipeline(task="ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
    embedder = SentenceTransformer(EMBEDDING_MODEL)
    return ner_pipe, embedder

def extract_text(pdf_path):
    print(f"[2/4] Reading Syllabus: {pdf_path}...")
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text("text") for page in doc])
    doc.close()
    return re.sub(r"\s{3,}", "  ", text).strip()

def get_skills_from_ner(text, ner_pipeline):
    sentences = re.split(r"(?<=[.!?])\s+|\n{2,}", text)
    chunks, buf = [], ""
    for s in sentences:
        if len(buf) + len(s) < 500: buf += " " + s
        else:
            chunks.append(buf.strip()); buf = s
    chunks.append(buf.strip())

    raw_ents = []
    for chunk in chunks:
        if chunk: raw_ents.extend(ner_pipeline(chunk))
    
    final_skills = set()
    for ent in raw_ents:
        if ent.get("score", 0.0) < NER_CONFIDENCE_THRESHOLD: continue
        clean_text = re.sub(r'[^a-zA-Z0-9\s\+]', '', ent.get("word", "").title()).strip()
        words = clean_text.split()
        if not words or any(w.lower() in PDF_NOISE for w in words): continue
        
        if len(words) <= 3:
            if words[0].lower() not in STOP_WORDS and clean_text.lower() not in HIJACKER_WORDS:
                final_skills.add(clean_text)
        else:
            for i in range(len(words)-1):
                if words[i].lower() not in STOP_WORDS and words[i+1].lower() not in STOP_WORDS:
                    final_skills.add(f"{words[i]} {words[i+1]}")
    return sorted(list(final_skills))

def match_skills(target_skills, extracted_skills, embedder):
    if not extracted_skills: return []
    student_embeddings = embedder.encode(extracted_skills, convert_to_tensor=True)
    results = []
    for req in target_skills:
        req_emb = embedder.encode(req, convert_to_tensor=True)
        scores = util.cos_sim(req_emb, student_embeddings)[0]
        best_idx = scores.argmax()
        score = scores[best_idx].item() * 100
        results.append({"requirement": req, "best_match": extracted_skills[best_idx], "score": round(score, 2)})
    return results

#Data export function

def save_results_to_json(results, role_name, pdf_path):
    output_file = "report.json"
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Prepare the data object
    report_data = {
        "metadata": {
            "timestamp": timestamp,
            "role": role_name,
            "source_file": pdf_path
        },
        "results": results,
        "summary": {
            "total_requirements": len(results),
            "met": sum(1 for r in results if r['score'] >= MATCH_THRESHOLD_PCT)
        }
    }

    # If file exists, append; otherwise, create a list
    all_reports = []
    if os.path.exists(output_file):
        with open(output_file, 'r') as f:
            try:
                all_reports = json.load(f)
                if not isinstance(all_reports, list): all_reports = [all_reports]
            except:
                all_reports = []
    
    all_reports.append(report_data)

    with open(output_file, 'w') as f:
        json.dump(all_reports, f, indent=4)
    print(f"\n Data successfully archived to {output_file}")

# ── 4. INTERACTIVE MAIN ───────────────────────────────────────────────────────

if __name__ == "__main__":
    print("\n" + "="*50)
    print("      WELCOME TO SKILLIO: ASPIRATION ENGINE")
    print("="*50)

    pdf_input = input("\n Enter path to Syllabus PDF: ").strip()
    if not os.path.exists(pdf_input):
        print(" Error: File not found."); sys.exit()

    print("\n Select target role:")
    for k, v in ROLE_MAP.items(): print(f"  {k}. {v['role']}")
    
    choice = input("\nSelect (1-4): ").strip()
    if choice == "4":
        custom = input("Enter skills (comma separated): ")
        target_skills = [s.strip() for s in custom.split(",")]
        role_name = "Custom Career"
    elif choice in ROLE_MAP:
        target_skills = ROLE_MAP[choice]["skills"]
        role_name = ROLE_MAP[choice]["role"]
    else:
        print(" Error: Invalid selection."); sys.exit()

    ner_pipe, embedder = load_models()
    full_text = extract_text(pdf_input)
    print("[3/4] Extracting curriculum skills...")
    extracted = get_skills_from_ner(full_text, ner_pipe)
    
    print(f"[4/4] Comparing against {role_name}...")
    results = match_skills(target_skills, extracted, embedder)

    # Print Report
    print("\n" + "="*70)
    print(f"  REPORT: {role_name}")
    print("="*70)
    print(f"{'REQUIRED':<20} | {'BEST MATCH':<25} | {'SCORE'}")
    print("-" * 70)
    
    qualified = 0
    for r in results:
        passed = r['score'] >= MATCH_THRESHOLD_PCT
        if passed: qualified += 1
        indicator = "✅" if passed else "❌"
        print(f"{r['requirement']:<20} | {r['best_match'][:24]:<25} | {r['score']:>5.1f}% {indicator}")

    print("-" * 70)
    print(f"READINESS: {qualified}/{len(target_skills)} ({round(qualified/len(target_skills)*100, 1)}%)")
    
    # SAVE TO JSON
    save_results_to_json(results, role_name, pdf_input)
    print("="*70 + "\n")