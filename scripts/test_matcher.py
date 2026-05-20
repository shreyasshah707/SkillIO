from sentence_transformers import SentenceTransformer, util

# 1. Load a pre-trained embedding model (MiniLM is tiny, incredibly fast, and very smart)
print("Loading Semantic Matcher Engine...")
embedder = SentenceTransformer('all-MiniLM-L6-v2')

# 2. The clean skill a Job Description is asking for:
job_requirement = "Python"

# 3. The messy skills we extracted from the student's syllabus:
student_skills = [
    "Python For Logic Development",
    "Data Science",
    "Communicate Effectively",
    "Java" # Adding a different language to see if it gets confused
]

# 4. Convert all words into Math (Vector Embeddings)
job_embedding = embedder.encode(job_requirement, convert_to_tensor=True)
student_embeddings = embedder.encode(student_skills, convert_to_tensor=True)

# 5. Calculate the Cosine Similarity (Distance) between the Job and the Student's skills
print(f"\nComparing against Job Requirement: '{job_requirement}'")
print("-" * 60)

cosine_scores = util.cos_sim(job_embedding, student_embeddings)[0]

# 6. Print the results!
for i in range(len(student_skills)):
    score = cosine_scores[i].item() * 100  # Convert to percentage
    print(f"Student Skill: {student_skills[i]:<30} | Match Score: {score:.1f}%")