# AI Resume Matcher & Job Finder 🔍💼

This is a full-stack web application built using Django (backend), React (frontend), and PostgreSQL (database). It enables users to:

- Upload their resumes (PDF/DOCX)
- Extract and analyze key resume data to build a detailed profile
- Upload job descriptions to compare with their resume and get:
  - Relevance score (%)
  - Selection chance prediction
- View job recommendations from sites like LinkedIn or Naukri based on profile (80%+ match)



## 💻 Tech Stack

- Backend: Django, Django REST Framework
- Frontend: React.js (Vite or CRA)
- AI/ML: spaCy + Sentence Transformers + Scikit-learn (or GPT4All / Ollama LLMs - Free & Local)
- DB: PostgreSQL