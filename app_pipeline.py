import os
from transformers import pipeline, AutoModelForTokenClassification, AutoTokenizer
from sentence_transformers import SentenceTransformer, util

# ==========================================
# SETUP & MODEL LOADING (CLOUD VERSION)
# ==========================================
print("Loading Models from Hugging Face Hub...")

# Replace 'your-username' with your actual HF username!
repo_id = "shreyasshah707/skill-extractor" 

# Notice we don't need local paths anymore!
tokenizer = AutoTokenizer.from_pretrained(repo_id)
model = AutoModelForTokenClassification.from_pretrained(repo_id)

extractor = pipeline(
    "ner", 
    model=model, 
    tokenizer=tokenizer, 
    aggregation_strategy="simple"
)

# Phase 2 stays exactly the same...
embedder = SentenceTransformer('all-MiniLM-L6-v2')

# Load Phase 2: The Semantic Matcher (Embedding Model)
embedder = SentenceTransformer('all-MiniLM-L6-v2')

# ==========================================
# INPUT DATA
# ==========================================
print("\nReading Syllabus...")
# ... (The rest of your script from here down remains exactly the same) ...

try:
    with open("syllabus.txt", "r", encoding="utf-8") as f:
        syllabus_text = f.read()
except FileNotFoundError:
    print("Error: syllabus.txt not found! Using default test text instead.")
    syllabus_text = "The candidate will learn Python for logic development, machine learning, and data science basics. They must communicate effectively."

# Let's say the student applies for a "Junior Data Scientist" role
job_requirements = [
    "Python", 
    "Machine Learning", 
    "Cloud Computing", 
    "Data Science",
    "Team Leadership"
]

# ==========================================
# PHASE 1: EXTRACT SKILLS FROM SYLLABUS
# ==========================================
print("\n--- Phase 1: Extracting Skills ---")
ner_results = extractor(syllabus_text)
extracted_skills = []

if ner_results:
    for entity in ner_results:
        # Filter for SKILL tags and drop low-confidence guesses
        if entity["entity_group"] == "SKILL" and entity["score"] > 0.50:
            extracted_skills.append(entity["word"].strip().title())

# Remove duplicates
unique_student_skills = list(set(extracted_skills))
print(f"Extracted {len(unique_student_skills)} raw skills from syllabus.")
for skill in unique_student_skills:
    print(f"  - {skill}")

# ==========================================
# PHASE 2: SEMANTIC MATCHING
# ==========================================
print("\n--- Phase 2: Matching Against Job Requirements ---")
MATCH_THRESHOLD = 60.0 # Our magic number to decide if a skill is a valid match

# Convert the student's messy skills into Math (Vector Embeddings) once
student_embeddings = embedder.encode(unique_student_skills, convert_to_tensor=True)

for req in job_requirements:
    # Convert the job requirement into Math
    req_embedding = embedder.encode(req, convert_to_tensor=True)
    
    # Compare this one requirement against ALL student skills
    cosine_scores = util.cos_sim(req_embedding, student_embeddings)[0]
    
    # Find the highest matching score
    best_score_idx = cosine_scores.argmax()
    best_score = cosine_scores[best_score_idx].item() * 100
    best_matching_skill = unique_student_skills[best_score_idx]
    
    # Output the result
    if best_score >= MATCH_THRESHOLD:
        print(f"✅ QUALIFIED   | Req: {req:<16} | Matched with: '{best_matching_skill}' ({best_score:.1f}%)")
    else:
        print(f"❌ SKILL GAP   | Req: {req:<16} | Closest was : '{best_matching_skill}' ({best_score:.1f}%)")

print("\n==========================================")
print("Pipeline Execution Complete.")
print("==========================================")