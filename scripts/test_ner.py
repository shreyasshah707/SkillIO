from transformers import pipeline

model_path = "./models/ner_model" 

print("Loading your custom Skill Extractor AI...")
skill_extractor = pipeline(
    task="ner",
    model=model_path,
    tokenizer=model_path,
    aggregation_strategy="simple" 
)

print("\nReading syllabus.txt...")
with open("syllabus.txt", "r", encoding="utf-8") as file:
    syllabus_text = file.read()

print("\n" + "="*50)
print("EXTRACTING SKILLS...")
print("="*50)

results = skill_extractor(syllabus_text)

extracted_skills = []

if results:
    for entity in results:
        # Only grab the "SKILL" tags and filter out low-confidence guesses
        if entity["entity_group"] == "SKILL" and entity["score"] > 0.50:
            skill = entity["word"].strip()
            confidence = entity["score"] * 100
            extracted_skills.append((skill, confidence))
            
    unique_skills = list(set([s[0].title() for s in extracted_skills]))
    
    print("\nFINAL SKILL LIST FOUND IN SYLLABUS:")
    for skill in unique_skills:
        print(f" - {skill}")
        
else:
    print("No skills detected in this excerpt.")