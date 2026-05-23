# 🎓 SkillIO: Aspiration Engine

**SkillIO** is an end-to-end, multi-agent AI pipeline designed to bridge the gap between traditional academic syllabi and industry requirements. 

It analyzes a student's course syllabus, identifies missing skills required for their dream job role, curates a personalized curriculum of free online resources, and automatically tests their knowledge using a dynamic Retrieval-Augmented Generation (RAG) quiz engine.

---

## 🚀 Features & Pipeline

The pipeline is split into three distinct, modular phases:

### Phase 1: The AI Brain (`app_pipeline.py`)
* Parses academic PDFs (Syllabus) using local NLP techniques.
* Uses local **Hugging Face Sentence Transformers** to perform cosine similarity mapping.
* Compares the extracted syllabus skills against industry-standard roles (e.g., Machine Learning Engineer, Cloud Architect).
* Outputs a personalized readiness score and a list of specific **Skill Gaps** (saved to `report.json`).

### Phase 2: Recommendation Engine (`recommendation_engine.py`)
* Ingests the skill gaps identified in Phase 1.
* Queries the **YouTube Data API v3** and **Dev.to (Forem) API**.
* Curates highly targeted, freemium educational resources (articles and videos) for the missing skills.
* Saves the customized learning path to `recommendations.json`.

### Phase 3: Weekly Quiz Generator (`quiz_generator.py`)
* Interactive CLI allowing students to select which missing skills they want to be tested on.
* **Scraping Engine:** Bypasses standard APIs to extract hidden YouTube subtitles and scrapes Dev.to article text.
* **RAG System:** Feeds the scraped educational content directly into the modern **Google Gemini 2.5 Flash** model.
* Uses **Batch Prompting** and **JSON Enforcement** to generate a highly specific, context-aware 10-question flashcard quiz based *only* on the materials the student studied (saved to `weekly_quiz.json`).

---

## 🛠️ Tech Stack

* **Language:** Python 3.x
* **AI & NLP:** Google GenAI SDK (Gemini 2.5 Flash), Hugging Face (`sentence-transformers`), PyTorch
* **Data Extraction:** `BeautifulSoup4`, `youtube-transcript-api`, `PyPDF2` / `pdfplumber`
* **APIs:** YouTube Data API v3, Forem (Dev.to) API
* **Environment Management:** `python-dotenv`

---

## ⚙️ Installation & Setup

**1. Clone the repository**
```bash
git clone [https://github.com/shreyasshah707/SkillIO.git](https://github.com/shreyasshah707/SkillIO.git)
cd SkillIO