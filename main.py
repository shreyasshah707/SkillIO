import os
import shutil
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import app_pipeline
import quiz_generator

app = FastAPI(title="SkillIO Direct ML API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "active", "message": "ML Model Server Running"}

@app.post("/analyze/syllabus")
async def analyze_syllabus(
    file: UploadFile = File(...),
    role_choice: str = Form("Data Scientist") # Default fallback if none sent
):
    try:
        os.makedirs("uploads", exist_ok=True)
        file_path = os.path.join("uploads", file.filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        analysis_result = app_pipeline.run_pipeline(file_path, role_choice) 
        
        return analysis_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/quiz/generate")
async def generate_quiz():
    try:
        quiz_data = quiz_generator.generate_quiz()
        return quiz_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))