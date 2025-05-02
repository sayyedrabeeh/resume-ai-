# 🚀 ResuMatch - AI-Powered Resume & Job Matcher

![ResuMatch Banner](/screenshot/banner.png)

## 📌 Overview

ResuMatch is an intelligent application that bridges the gap between job seekers and their ideal positions. Using advanced text analysis and skill extraction algorithms, it analyzes resumes, compares them against job descriptions, and provides actionable insights to improve your chances of landing interviews.

## ✨ Key Features

### 🔍 Resume Analysis
- **Smart PDF Parsing**: Extract structured data from PDF resumes using PyMuPDF (fitz)
- **Comprehensive Data Extraction**: Automatically identifies name, email, phone, skills, experience, education, projects, and more
- **Social Profile Detection**: Extracts LinkedIn, GitHub, and personal website URLs

### 🎯 Job Matching
- **Skill Gap Analysis**: Identifies missing skills required in job descriptions
- **Match Scoring Algorithm**: Calculate a precise match percentage between resume and job descriptions
- **Intelligent Feedback**: Get personalized suggestions to improve your profile for specific roles

### 👤 User Management
- **JWT Authentication**: Secure API access with token-based authentication
- **Multiple Resume Support**: Upload and manage multiple resume versions
- **Current Profile Selection**: Set your active profile for job matching

### 🌐 Job Market Integration
- **Real-time Job Search**: Connect with job search APIs to find relevant positions
- **Match-Based Sorting**: Jobs are displayed with personalized match scores

## 🛠️ Technical Architecture

### Backend Technologies
- **Django & Django REST Framework**: Robust API development
- **PyMuPDF (fitz)**: Advanced PDF text extraction
- **Regular Expressions**: Pattern-based text analysis for resume sections
- **JWT Authentication**: SimpleJWT for secure user sessions
- **Custom Skill Extraction**: Advanced algorithms to identify technical skills
- **MD5 Hashing**: Prevents duplicate resume uploads

### API Endpoints

#### Authentication APIs
- `POST /api/signup/`: Create a new user account
- `POST /api/login/`: Authenticate and receive JWT tokens

#### Resume Management APIs
- `POST /api/resume/upload/`: Upload and parse a new resume
- `GET /api/profiles/`: List all user profiles
- `GET /api/current-profile/`: Get current active profile
- `POST /api/set-current-profile/`: Set a profile as current

#### Job Matching APIs
- `POST /api/match/`: Compare current profile with job description
- `GET /api/jobs/`: Fetch matching jobs from external APIs

## 📊 Match Scoring Algorithm

ResuMatch uses a sophisticated algorithm to calculate match scores:

1. **Skill Extraction**: Identifies both single-word skills (e.g., "Python", "React") and multi-word skills (e.g., "machine learning", "project management")
2. **Proficiency Analysis**: Detects skill levels (beginner, intermediate, advanced)
3. **Summary Relevance**: Analyzes resume summary for keyword matches
4. **Experience Evaluation**: Considers years of experience and leadership roles
5. **Actionable Feedback**: Generates specific suggestions based on missing skills

The final score weighs these factors to provide a realistic assessment of job fit.
 

## 💾 Data Models

### Profile Model
- User reference
- Personal info (name, email, phone)
- Resume sections (summary, skills, education, experience)
- Social links (LinkedIn, GitHub, website)
- Resume file & hash (for duplicate detection)
- Current profile flag

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8+
- Django 4.0+
- PyMuPDF (fitz)
- PostgreSQL (recommended) or SQLite

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resumatch.git
   cd resumatch
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
    On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```
   SECRET_KEY=your_secret_key
   DEBUG=True
   DATABASE_URL=postgres://user:password@localhost:5432/resumatch
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start development server:
   ```bash
   python manage.py runserver
   ```

## 📝 API Usage Examples

 
` 

### Match Job Description
```python
import requests

url = "http://localhost:8000/api/match/"
headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}
data = {
    "job_description": "We are looking for a Python developer with 3+ years of experience..."
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

 

## 👨‍💻 Contributing

We welcome contributions to ResuMatch! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
 

## 🙏 Acknowledgements

- [PyMuPDF](https://github.com/pymupdf/PyMuPDF) for PDF parsing
- [Django REST Framework](https://www.django-rest-framework.org/) for API development
- [SimpleJWT](https://github.com/jazzband/djangorestframework-simplejwt) for authentication

### HAPPY CODING
---

<p align="center">
  <strong>ResuMatch</strong> - AI-powered resume analysis and job matching
</p>
<p align="center">
  Made with ❤️ for job seekers everywhere
</p>
