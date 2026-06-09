import json
import os
import urllib.parse
import urllib.request
import re
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

if not YOUTUBE_API_KEY:
    raise ValueError(" YOUTUBE_API_KEY is missing! Check your .env file.")

REPORT_FILE = "report.json"
OUTPUT_FILE = "recommendations.json"
PASS_THRESHOLD = 55.0

def get_top_youtube_video(skill):
    """Fetches the #1 most relevant English YouTube tutorial using the Data API."""
    search_query = f'"{skill}" tutorial for beginners'
    encoded_query = urllib.parse.quote(f"{skill} tutorial in:name,description")
    fallback_url = f"https://www.youtube.com/results?search_query={encoded_query}"
    
    if YOUTUBE_API_KEY == "YOUR_YOUTUBE_API_KEY_HERE" or not YOUTUBE_API_KEY:
        return fallback_url

    api_url = (
        f"https://www.googleapis.com/youtube/v3/search?"
        f"part=snippet&q={encoded_query}&type=video"
        f"&relevanceLanguage=en&maxResults=1&key={YOUTUBE_API_KEY}"
    )
    
    try:
        req = urllib.request.Request(api_url)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data.get("items"):
                video_id = data["items"][0]["id"]["videoId"]
                video_title = data["items"][0]["snippet"]["title"].replace("&quot;", "'").replace("&#39;", "'")
                video_title = re.sub(r'&[a-zA-Z]+;', '', video_title) 
                print(f"    ├─  YT API Found : '{video_title[:40]}...'")
                return f"https://www.youtube.com/watch?v={video_id}"
    except Exception:
        pass 
        
    return fallback_url

def get_top_dev_article(skill):
    """Fetches the top technical article using the Dev.to API (via Tag search)."""
    tag = skill.lower().replace(" ", "").replace("/", "").replace("-", "")
    fallback_url = f"https://dev.to/search?q={urllib.parse.quote(skill)}"
    
    api_url = f"https://dev.to/api/articles?tag={tag}&per_page=1"
    
    try:
        req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data and len(data) > 0:
                article_url = data[0]["url"]
                article_title = data[0]["title"]
                print(f"    ├─  Dev.to API   : '{article_title[:40]}...'")
                return article_url
    except Exception:
        pass
        
    return fallback_url

def get_top_coursera_course(skill):
    """Fetches the top Coursera course using their public Catalog API."""
    encoded_query = urllib.parse.quote(skill)
    fallback_url = f"https://www.coursera.org/search?query={encoded_query}"
    
    api_url = f"https://api.coursera.org/api/courses.v1?q=search&query={encoded_query}"
    
    try:
        req = urllib.request.Request(api_url)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data.get("elements") and len(data["elements"]) > 0:
                slug = data["elements"][0]["slug"]
                course_name = data["elements"][0]["name"]
                print(f"    ├─  Coursera API : '{course_name[:40]}...'")
                return f"https://www.coursera.org/learn/{slug}"
    except Exception:
        pass
        
    return fallback_url

def get_top_github_repositories(skill, count=2):
    """Queries the GitHub Search API for highly-rated open-source repositories repositories related to the skill gap."""
    encoded_query = urllib.parse.quote(f"{skill} in:name,description")
    api_url = f"https://api.github.com/search/repositories?q={encoded_query}&sort=stars&order=desc&per_page={count}"
    fallback_url = f"https://github.com/search?q={urllib.parse.quote(skill)}"
    
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "SkillIO-Aspiration-Engine"
    }
    
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
        
    try:
        req = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            repos = []
            for item in data.get("items", []):
                repos.append({
                    "repo_name": item.get("full_name"),
                    "repo_url": item.get("html_url"),
                    "description": item.get("description") or "No description available.",
                    "stars": item.get("stargazers_count")
                })
            if repos:
                print(f"    ├─  GitHub API   : Found {len(repos)} top repository/repositories")
                return repos
    except Exception:
        pass
        
    return [{
        "repo_name": f"{skill} Projects Search",
        "repo_url": fallback_url,
        "description": f"Fallback open-source link for {skill} source code.",
        "stars": 0
    }]

def generate_udemy_link(skill):
    """Generates a Udemy search link."""
    query = urllib.parse.quote(skill)
    return f"https://www.udemy.com/courses/search/?src=ukw&q={query}"

def generate_recommendations():
    if not os.path.exists(REPORT_FILE):
        print(f"  Error: {REPORT_FILE} not found. Run app_pipeline.py first.")
        return

    with open(REPORT_FILE, "r") as f:
        reports = json.load(f)
        latest_report = reports[-1]

    role = latest_report["metadata"]["role"]
    results = latest_report["results"]
    
    skill_gaps = [r["requirement"] for r in results if r["score"] < PASS_THRESHOLD]
    
    if not skill_gaps:
        print(f" 🎉 Wow! You have 100% readiness for {role}. No gaps found!")
        return

    print(f"\n[PHASE 2] Generating API-Driven Recommendations for '{role}'...")

    recommendation_data = {
        "metadata": {
            "generated_on": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "target_role": role,
            "total_gaps_to_fill": len(skill_gaps)
        },
        "learning_modules": []
    }

    print("\n" + "="*80)
    print(f"   YOUR PERSONALIZED LEARNING PATH")
    print("="*80)

    for skill in skill_gaps:
        print(f"\n  SKILL GAP: {skill.upper()}")
        
        module = {
            "skill": skill,
            "freemium_resources": {
                "youtube_video": get_top_youtube_video(skill),
                "article": get_top_dev_article(skill)
            },
            "open_source_projects": get_top_github_repositories(skill, count=2),
            "paid_certifications": {
                "coursera_course": get_top_coursera_course(skill),
                "udemy_search": generate_udemy_link(skill)
            }
        }
        recommendation_data["learning_modules"].append(module)

    with open(OUTPUT_FILE, "w", encoding='utf-8') as f:
        json.dump(recommendation_data, f, indent=4, ensure_ascii=False)
    
    print("\n" + "="*80)
    print(f" Recommendations successfully saved to {OUTPUT_FILE}")
    print("="*80 + "\n")

if __name__ == "__main__":
    generate_recommendations()