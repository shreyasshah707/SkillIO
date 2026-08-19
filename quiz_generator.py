import json
import os
import random
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi
from google import genai
from google.genai import types

from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing! Check your .env file.")

INPUT_FILE = "recommendations.json"
QUIZ_FILE = "weekly_quiz.json"
TOTAL_QUESTIONS = 10  

client = genai.Client(api_key=GEMINI_API_KEY)

def scrape_article_text(url):
    """Visits the recommended article and extracts the text."""
    if "dev.to" not in url:
        return None
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(response.text, 'html.parser')
        paragraphs = soup.find_all('p')
        full_text = " ".join([p.get_text() for p in paragraphs])
        return full_text[:5000] 
    except Exception:
        return None

def get_youtube_transcript(video_url):
    """Extracts auto-generated subtitles from the recommended YouTube video."""
    if "youtube.com" not in video_url:
        return None
    try:
        parsed_url = urlparse(video_url)
        video_id = parse_qs(parsed_url.query)['v'][0]
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        full_transcript = " ".join([t['text'] for t in transcript_list])
        return full_transcript[:5000]
    except Exception:
        return None

def generate_flashcard_batch(skill, freemium_resources, count):
    """Generates an array of questions based on the selected material."""
    source_choice = random.choice(["video", "article"])
    context_text = None
    source_url = ""

    if source_choice == "video":
        source_url = freemium_resources.get("youtube_video", "")
        print(f"    [ Gemini is 'watching' the YouTube video for {skill} ({count} Qs)...]")
        context_text = get_youtube_transcript(source_url)
        if not context_text:
            source_choice = "article"

    if source_choice == "article":
        source_url = freemium_resources.get("article", "")
        print(f"    [Gemini is reading the Dev.to article for {skill} ({count} Qs)...]")
        context_text = scrape_article_text(source_url)

    if context_text:
        prompt = f"""
        You are an expert technical tutor. Based strictly on the following text, generate {count} short, thoughtful technical interview questions about {skill}.
        
        Text: '{context_text}'
        
        Return ONLY a JSON object with this exact structure:
        {{
            "flashcards": [
                {{
                    "question": "Question 1 here",
                    "correct_answer": "Answer 1 here"
                }}
            ]
        }}
        """
    else:
        print(f"    [ Scrapers failed. Using Gemini's baseline knowledge for {skill}...]")
        source_url = "General Knowledge"
        prompt = f"""
        You are an expert technical tutor. Generate {count} short, technical interview questions to test a beginner's knowledge of {skill}. Provide brief, accurate answers.
        
        Return ONLY a JSON object with this exact structure:
        {{
            "flashcards": [
                {{
                    "question": "Question 1 here",
                    "correct_answer": "Answer 1 here"
                }}
            ]
        }}
        """

    generated_cards = []
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )
        ai_data = json.loads(response.text)
        
        for item in ai_data.get("flashcards", []):
            generated_cards.append({
                "skill": skill,
                "tested_source": source_choice.upper(),
                "source_url": source_url,
                "question": item.get("question", "Error generating question."),
                "correct_answer": item.get("correct_answer", "Error generating answer.")
            })
    except Exception as e:
        print(f"    [Gemini API Error: {e}]")
        
    return generated_cards


# ==========================================================
# NEW: API-Friendly Non-Interactive Function for FastAPI
# ==========================================================
def generate_quiz(selected_skills=None):
    """Generates a quiz automatically for FastAPI without requiring terminal input."""
    if not os.path.exists(INPUT_FILE):
        return {"error": f"{INPUT_FILE} not found. Run recommendation_engine.py first."}

    with open(INPUT_FILE, "r", encoding='utf-8') as f:
        data = json.load(f)

    learning_modules = data.get("learning_modules", [])
    if not learning_modules:
        return {"error": "No skill gaps found to test!"}

    # Filter skills if specific ones were requested, otherwise use ALL
    if selected_skills:
        selected_modules = [m for m in learning_modules if m.get("skill") in selected_skills]
    else:
        selected_modules = learning_modules

    if not selected_modules:
        selected_modules = learning_modules

    base_count = TOTAL_QUESTIONS // len(selected_modules)
    remainder = TOTAL_QUESTIONS % len(selected_modules)

    quiz_data = {
        "metadata": {
            "quiz_date": datetime.now().strftime("%Y-%m-%d"),
            "type": "Targeted Resource Knowledge Check",
            "total_questions": TOTAL_QUESTIONS,
            "skills_tested": [m["skill"] for m in selected_modules]
        },
        "flashcards": []
    }

    for idx, module in enumerate(selected_modules):
        skill = module["skill"]
        freemium_resources = module.get("freemium_resources", {})
        q_count = base_count + (1 if idx < remainder else 0)
        
        if q_count == 0:
            continue

        batch = generate_flashcard_batch(skill, freemium_resources, q_count)
        for card in batch:
            quiz_data["flashcards"].append(card)

    # Save to disk as well
    with open(QUIZ_FILE, "w", encoding='utf-8') as f:
        json.dump(quiz_data, f, indent=4, ensure_ascii=False)

    return quiz_data


# Interactive CLI wrapper (Kept for manual terminal runs)
def create_weekly_quiz():
    if not os.path.exists(INPUT_FILE):
        print(f" Error: {INPUT_FILE} not found. Run recommendation_engine.py first.")
        return

    with open(INPUT_FILE, "r", encoding='utf-8') as f:
        data = json.load(f)

    learning_modules = data.get("learning_modules", [])
    if not learning_modules:
        print("No skill gaps found to test!")
        return

    print("\n" + "="*50)
    print(" SKILLIO WEEKLY QUIZ GENERATOR")
    print("="*50)
    for idx, module in enumerate(learning_modules):
        print(f"  [{idx + 1}] {module['skill']}")
    print(f"  [0] ALL of the above")
    
    user_input = input("\nEnter the numbers of your choices (e.g., 1 or 1,3): ")
    
    selected_modules = []
    if "0" in user_input.split(","):
        selected_modules = learning_modules
    else:
        selected_indices = [int(x.strip()) - 1 for x in user_input.split(",") if x.strip().isdigit()]
        selected_modules = [learning_modules[i] for i in selected_indices if 0 <= i < len(learning_modules)]

    if not selected_modules:
        print("Invalid selection. Exiting.")
        return

    selected_skills = [m["skill"] for m in selected_modules]
    result = generate_quiz(selected_skills)
    print("Quiz successfully created!")

if __name__ == "__main__":
    create_weekly_quiz()