# SkillIO: Aspiration Engine

**SkillIO** is an end-to-end, multi-agent AI pipeline designed to bridge the gap between traditional academic syllabi and industry requirements. 

It analyzes a student's course syllabus, identifies missing skills required for their dream job role, curates a personalized curriculum of online resources (including open-source codebases), and automatically tests their knowledge using a dynamic Retrieval-Augmented Generation (RAG) quiz engine.

---

## Features & Pipeline

The pipeline is split into three distinct, modular phases:

### Phase 1: The AI Brain (`app_pipeline.py`)
* Parses academic PDFs (Syllabus) using **PyMuPDF**.
* Uses local **Hugging Face Sentence Transformers** to perform cosine similarity mapping.
* Compares extracted syllabus skills against industry-standard roles (e.g., Machine Learning Engineer, Cloud Architect) to output a list of specific **Skill Gaps** (saved to `report.json`).

### Phase 2: Recommendation Engine (`recommendation_engine.py`)
* Ingests the skill gaps identified in Phase 1.
* Queries the **YouTube Data API v3**, **Dev.to (Forem) API**, and **GitHub Search API**.
* Curates a highly targeted learning path featuring video tutorials, technical articles, and top-tier open-source repositories sorted by stars.
* Saves the customized curriculum to `recommendations.json`.

### Phase 3: Weekly Quiz Generator (`quiz_generator.py`)
* Provides an interactive CLI allowing students to select which missing skills they want to be tested on.
* **Scraping Engine:** Extracts hidden YouTube subtitles and scrapes Dev.to article text.
* **RAG System:** Feeds scraped text into the modern **Google Gemini 2.5 Flash** model using **Batch Prompting** and **JSON Enforcement** to generate a contextual 10-question flashcard quiz (saved to `weekly_quiz.json`).

---

## Tech Stack

* **Language:** Python 3.x
* **AI & NLP:** Google GenAI SDK (Gemini 2.5 Flash), Hugging Face (`sentence-transformers`), PyTorch
* **Data Extraction:** `BeautifulSoup4`, `youtube-transcript-api`, `PyMuPDF`
* **APIs:** YouTube Data API v3, Forem (Dev.to) API, GitHub Search API
* **Environment Management:** `python-dotenv`

---

## Installation & Setup

**1. Clone the repository**
```bash
git clone [https://github.com/shreyasshah707/SkillIO.git](https://github.com/shreyasshah707/SkillIO.git)
cd SkillIO