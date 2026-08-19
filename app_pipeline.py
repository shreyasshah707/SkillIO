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

# Configurations and Constants
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

# Model Cache (prevents re-loading models on every API request)
_NER_PIPE = None
_EMBEDDER = None


def load_models():
    """Loads transformers and embedding models into memory."""
    global _NER_PIPE, _EMBEDDER
    if _NER_PIPE is None or _EMBEDDER is None:
        print("\n[AI Brain] Initializing Models...")
        tokenizer = AutoTokenizer.from_pretrained(HF_NER_MODEL)
        model = AutoModelForTokenClassification.from_pretrained(HF_NER_MODEL)
        _NER_PIPE = pipeline(task="ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
        _EMBEDDER = SentenceTransformer(EMBEDDING_MODEL)
        print("[AI Brain] Models Loaded Successfully!")
    return _NER_PIPE, _EMBEDDER


def extract_text(pdf_path):
    """Extracts raw text from PDF file."""
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text("text") for page in doc])
    doc.close()
    return re.sub(r"\s{3,}", "  ", text).strip()


def get_skills_from_ner(text, ner_pipeline):
    """Extracts candidate skill entities using NER pipeline."""
    sentences = re.split(r"(?<=[.!?])\s+|\n{2,}", text)
    chunks, buf = [], ""
    for s in sentences:
        if len(buf) + len(s) < 500:
            buf += " " + s
        else:
            chunks.append(buf.strip())
            buf = s
    chunks.append(buf.strip())

    raw_ents = []
    for chunk in chunks:
        if chunk:
            raw_ents.extend(ner_pipeline(chunk))

    final_skills = set()
    for ent in raw_ents:
        if ent.get("score", 0.0) < NER_CONFIDENCE_THRESHOLD:
            continue
        clean_text = re.sub(r'[^a-zA-Z0-9\s\+]', '', ent.get("word", "").title()).strip()
        words = clean_text.split()
        if not words or any(w.lower() in PDF_NOISE for w in words):
            continue

        if len(words) <= 3:
            if words[0].lower() not in STOP_WORDS and clean_text.lower() not in HIJACKER_WORDS:
                final_skills.add(clean_text)
        else:
            for i in range(len(words) - 1):
                if words[i].lower() not in STOP_WORDS and words[i + 1].lower() not in STOP_WORDS:
                    final_skills.add(f"{words[i]} {words[i + 1]}")
    return sorted(list(final_skills))


def match_skills(target_skills, extracted_skills, embedder):
    """Matches target job skills against extracted syllabus skills via cosine similarity."""
    if not extracted_skills:
        return []
    student_embeddings = embedder.encode(extracted_skills, convert_to_tensor=True)
    results = []
    for req in target_skills:
        req_emb = embedder.encode(req, convert_to_tensor=True)
        scores = util.cos_sim(req_emb, student_embeddings)[0]
        best_idx = scores.argmax()
        score = scores[best_idx].item() * 100
        results.append({
            "requirement": req,
            "best_match": extracted_skills[best_idx],
            "score": round(score, 2)
        })
    return results


def run_pipeline(pdf_path: str, role_choice: str, custom_skills: list = None):
    """
    Primary API wrapper function.
    Accepts PDF path, role selection (key, role name, or 'Custom Role'),
    runs NER extraction and similarity matching, and returns the structured JSON report.
    """
    # 1. Resolve Target Skills
    target_skills = []
    role_name = "Custom Role"

    if role_choice in ROLE_MAP:
        role_name = ROLE_MAP[role_choice]["role"]
        target_skills = ROLE_MAP[role_choice]["skills"]
    else:
        # Check if role_choice matches a role name string
        matched_role = False
        for k, v in ROLE_MAP.items():
            if v["role"].lower() == role_choice.lower():
                role_name = v["role"]
                target_skills = v["skills"]
                matched_role = True
                break
        if not matched_role:
            role_name = role_choice or "Custom Role"
            target_skills = custom_skills or []

    # 2. Load Models & Process PDF
    ner_pipe, embedder = load_models()
    full_text = extract_text(pdf_path)
    extracted = get_skills_from_ner(full_text, ner_pipe)
    results = match_skills(target_skills, extracted, embedder)

    # 3. Calculate Readiness Summary
    qualified = sum(1 for r in results if r['score'] >= MATCH_THRESHOLD_PCT)
    total = len(target_skills)
    readiness_pct = round((qualified / total * 100), 1) if total > 0 else 0.0

    return {
        "metadata": {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "role": role_name,
            "source_file": os.path.basename(pdf_path)
        },
        "results": results,
        "summary": {
            "total_requirements": total,
            "met": qualified,
            "readiness_pct": readiness_pct
        },
        "extracted_skills": extracted
    }


# Terminal Execution Mode
if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("      WELCOME TO SKILLIO: ASPIRATION ENGINE")
    print("=" * 50)

    pdf_input = input("\nEnter path to Syllabus PDF: ").strip()
    if not os.path.exists(pdf_input):
        print(" Error: File not found.")
        sys.exit()

    print("\n Select target role:")
    for k, v in ROLE_MAP.items():
        print(f"  {k}. {v['role']}")

    choice = input("\nSelect (1-4): ").strip()
    custom_skills_input = []
    if choice == "4":
        custom = input("Enter skills (comma separated): ")
        custom_skills_input = [s.strip() for s in custom.split(",")]

    report = run_pipeline(pdf_input, choice, custom_skills_input)

    print("\n" + "=" * 70)
    print(f"  REPORT: {report['metadata']['role']}")
    print("=" * 70)
    print(f"{'REQUIRED':<20} | {'BEST MATCH':<25} | {'SCORE'}")
    print("-" * 70)

    for r in report['results']:
        passed = r['score'] >= MATCH_THRESHOLD_PCT
        indicator = "✅" if passed else "❌"
        print(f"{r['requirement']:<20} | {r['best_match'][:24]:<25} | {r['score']:>5.1f}% {indicator}")

    print("-" * 70)
    summary = report['summary']
    print(f"READINESS: {summary['met']}/{summary['total_requirements']} ({summary['readiness_pct']}%)")
    print("=" * 70 + "\n")