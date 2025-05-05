# 🚀 ResuMatch - AI-Powered Resume & Job Matching Platform

<div align="center">
  <img src="/screenshot/extracting.png" alt="ResuMatch Banner" />
  <p><strong>Smart Resume Analysis & Precision Job Matching</strong></p>
</div>
 
[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-4.2.0-green.svg)](https://www.djangoproject.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8.svg)](https://tailwindcss.com/)

## 📌 Overview

ResuMatch is a comprehensive full-stack application that bridges the gap between job seekers and their ideal positions. Using advanced text analysis and skill extraction algorithms, it analyzes resumes, compares them against job descriptions, and provides actionable insights to improve your chances of landing interviews.

<div align="center">
  <img src="/screenshot/banner.png" alt="ResuMatch Dashboard" />
</div>

## 🎮 Live Demo

 

📹 [Watch Demo Video](https://youtube.com/example-video) coming soon 

 

## 📋 Table of Contents

- [Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-system-architecture)
- [API Endpoints](#-api-endpoints)
- [Frontend Structure](#-frontend-structure)
- [Backend Structure](#-backend-structure)
- [Installation](#-installation--setup)
- [Usage Examples](#-usage-examples)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
 
## ✨ Key Features

### 🔍 Resume Analysis & Management
- **Smart PDF Parsing**: Extract structured data from PDF resumes
- **Multiple Profile Support**: Manage different versions of your professional profile
- **Social Profile Detection**: Automatically extracts LinkedIn, GitHub, and personal website URLs
- **Visual Resume Dashboard**: View all your parsed resume data in a clean, organized interface

<div align="center">
  <img src="/screenshot/upload.png" alt="Resume Upload & Parsing" />
</div>

### 🎯 Intelligent Job Matching

- **Skill Gap Analysis**: Identifies missing skills required in job descriptions
- **Match Scoring Algorithm**: Calculate a precise match percentage between resume and job descriptions
- **Intelligent Feedback**: Get personalized suggestions to improve your profile for specific roles
- **Visual Match Indicators**: Color-coded match percentage displays for quick assessment

<div align="center">
  <img src="/screenshot/jobmatching.png" alt="Job Matching Interface" />
</div>

### 🤖 HR Interview Preparation

- **100+ HR Interview Questions**: Access a comprehensive library of common interview questions
- **Category Filtering**: Filter questions by category to focus your preparation
- **Search Functionality**: Quickly find specific questions or topics
- **Interactive Chatbot**: Practice interview questions with an intelligent AI bot
- **Feedback System**: Receive instant feedback on your practice answers
- **Pagination Support**: Navigate easily through all questions

<div align="center">
  <img src="/screenshot/interviw.jpg" alt="HR Interview Practice" />
  <p><strong>100+ interview Questions  and  chatbot for pratice </strong></p>
</div>
 >

### 📄 Resume Builder

- **Professional Templates**: Generate polished, ATS-friendly resumes
- **Custom PDF Generation**: Create downloadable PDF resumes
- **Section Management**: Organize your experience, education, projects, and skills
- **Mini-Projects Support**: Showcase smaller projects in an organized format
- **Multiple Education & Experience Entries**: Comprehensive resume building capabilities


<div align="center">
  <img src="/screenshot/resumebuilder.jpg" alt="Resume Builder" />
  <p><strong>Resume builder  with  essential details </strong></p>
</div>

### OUTPUT from builder 

<div align="center">
  <img src="/screenshot/pdf.jpg" alt="Resume  Pdf" />
  <p><strong>Pdf file (Output from resume builder)</strong></p>
</div>


### 👤 User Management & Authentication
- **Secure JWT Authentication**: Token-based security for all user sessions
- **Responsive Account Management**: Mobile-friendly user interface
- **Profile Selection System**: Easily switch between different resume profiles
 

<div align="center">
  <img src="/screenshot/profile.png" alt="User Management" />
</div>

### 🌐 Job Market Integration
- **Real-time Job Search**: Connect with job search APIs to find relevant positions
- **Match-Based Sorting**: Jobs are displayed with personalized match scores
- **Direct Application Links**: Apply to matched jobs with one click
 

## 🛠️ Tech Stack

### Frontend
- **React**: Component-based UI development
- **React Router**: Navigation and routing
- **Axios**: Promise-based HTTP client
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **JWT Decode**: Token parsing for authentication

### Backend
- **Django**: Python web framework
- **Django REST Framework**: RESTful API development
- **PyMuPDF (fitz)**: Advanced PDF text extraction
- **ReportLab**: PDF generation for resume builder
- **SimpleJWT**: JWT authentication implementation
- **PostgreSQL**: Relational database management
- **Regular Expressions**: Pattern-based text analysis
- **Redis**: Caching for performance optimization

 
 

<div align="center">
  <img src="/screenshot/matching.png" alt="System Architecture Diagram" />
</div>

ResuMatch follows a typical client-server architecture:

1. **Frontend (React)**: Single-page application handling UI rendering
2. **Backend (Django)**: REST API server providing data and business logic
3. **Database (PostgreSQL)**: Persistent storage for user profiles and match data
4. **External Services**: Integration with job search APIs

## 📊 API Endpoints

### Authentication APIs
- `POST /api/signup/`: Create a new user account
- `POST /api/login/`: Authenticate and receive JWT tokens
- `POST /api/token/refresh/`: Refresh access token
- `POST /api/password-reset/`: Request password reset

### Resume Management APIs
- `POST /api/resumeupload/`: Upload and parse a new resume
- `GET /api/profiles/`: List all user profiles
- `GET /api/current-profile/`: Get current active profile
- `POST /api/set-current-profile/`: Set a profile as current

### Job Matching APIs
- `POST /api/match/match-job-description/`: Compare current profile with job description
- `GET /api/jobs/matching-jobs/`: Fetch matching jobs from external APIs

### HR Interview Practice APIs
- `GET /chatbot/hr-questions/`: Get all HR interview questions
- `GET /chatbot/start/`: Start a new interview practice session
- `POST /chatbot/next-question/`: Get next question with feedback on previous answer
- `GET /chatbot/random/`: Get a random HR interview question

### Resume Builder APIs
- `POST /api/resume/generate/`: Generate and download a PDF resume

## 🖥️ Frontend Structure

```
src/
├── components/         # Reusable UI components
│   ├── HRChatBot.jsx   # Interview practice chatbot
│   ├── HRQuestionsPage.jsx # HR questions display component
│  
├── pages/              # Page components
│   ├── Login.jsx       # User login
│   ├── Signup.jsx      # New user registration
│   ├── Dashboard.jsx   # Main user dashboard
│   ├── ResumeUpload.jsx # Resume upload interface
│   ├── JobMatcher.jsx  # Job matching tool
│   ├── JobMatches.jsx  # Matched jobs listing
│   ├── Profile.jsx     # User profile management
│   ├── HRInterviewPractice.jsx # Interview practice page
│   └── ...
├── api/                # API communication
│   ├── axiosInstance.js # Configured Axios client
│   └── axiosConfig.js  # Axios configuration  
│   └── ...              
└── App.jsx             # Main application component
```

### Key Frontend Features

1. **Responsive Design**: Mobile-first UI that works across all devices
2. **Interactive Job Cards**: Expandable job descriptions with match indicators
3. **Real-time Form Validation**: Immediate feedback on user inputs
4. **Loading States**: Visual feedback during API operations
5. **Token Management**: Automatic handling of JWT authentication
6. **Interview Chat Interface**: Interactive chatbot for interview practice
7. **Paginated Content**: Easy navigation through large content sets

<div align="center">
  <img src="/screenshot/mobile.png" alt="Mobile Responsive Design" />
  <p><em>Mobile-responsive interface for on-the-go job matching</em></p>
</div>

## 🔧 Backend Structure

```
resume_matcher/
├── users/
│   ├── models.py         # Profile data model
│   ├── serializers.py    # Data serialization
│   ├── views.py          # Resume upload & processing
├── match/
│   ├── matching.py       # Skill extraction & match scoring
│   ├── views.py          # Match processing & job fetching                  
├── jobs/                 # External job integration
├── chatbot/
│   ├── views.py          # HR interview questions and chatbot logic
│   ├── questions.py      # HR interview questions database
├── resume_builder/
│   ├── views.py          # PDF resume generation using ReportLab
```

### Match Scoring Algorithm

ResuMatch uses a sophisticated algorithm to calculate match scores:

1. **Skill Extraction**: Identifies both single-word skills (e.g., "Python", "React") and multi-word skills (e.g., "machine learning", "project management")
2. **Summary Relevance**: Analyzes resume summary for keyword matches
3. **Experience Evaluation**: Considers years of experience and leadership roles
4. **Actionable Feedback**: Generates specific suggestions based on missing skills

<div align="center">
  <img src="/screenshot/matchin1.png" alt="Match Algorithm Visualization" />
  <p><em>Visual representation of the match scoring algorithm</em></p>
</div>

### Interview Chatbot Logic

The HR interview practice system features:

1. **Interactive Question Flow**: Dynamic question selection based on user progress
2. **Smart Answer Analysis**: Evaluates user responses using keyword matching
3. **Feedback Generation**: Provides constructive feedback with score-based ratings
4. **Learning Path**: Tracks asked questions to ensure comprehensive coverage

<div align="center">
  <img src="/screenshot/chatbot.png" alt="HR Chatbot Interface" />
  <p><em>Interactive interview practice with real-time feedback</em></p>
</div>

### Resume Builder Engine

The PDF resume generator:

1. **Dynamic Content Placement**: Automatically adjusts layout based on content volume
2. **Multi-page Support**: Handles content overflow with professional formatting
3. **Section Priority**: Intelligently organizes content for maximum impact
4. **Visual Hierarchy**: Creates professional design with consistent styling

## 💾 Data Models

### Profile Model
- User reference (ForeignKey)
- Personal info (name, email, phone)
- Resume sections (summary, skills, education, experience)
- Social links (LinkedIn, GitHub, website)
- Resume file & hash (for duplicate detection)
- Current profile flag (Boolean)

### User Model (Extended Django User)
- Standard Django user fields
- Email verification status
- Account creation date
- Last login tracking

### HR Questions Model
- Question ID
- Question text
- Model answer
- Category classification
- Difficulty level

## 🔧 Installation & Setup

### Prerequisites
- Node.js 16+
- Python 3.8+
- PostgreSQL 12+


### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/sayyedrabeeh/resume-ai-.git
cd resumatch/frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and settings

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

 

## 🚀 Usage Examples

### User Registration Process

<div align="center">
  <img src="/screenshot/signup1.png" alt="Signup Process" />
  <p><em>Simple 3-step signup process for new users</em></p>
</div>

1. **Visit the signup page** and provide your email and password
2. **Verify your email address** through the confirmation link
3. **Complete your profile** by adding profile 
4. **Start matching** with potential job opportunities

### Resume Upload & Analysis

<div align="center">
  <img src="/screenshot/upload.png" alt="Resume Analysis" />
  <p><em>AI-powered resume analysis and information extraction</em></p>
</div>

1. **Upload your PDF resume** through the drag-and-drop interface
2. **Review extracted information** including skills, experience, and education
3. **Make any necessary corrections** to the extracted data
4. **Save your profile** for job matching

### Job Description Matching

<div align="center">
  <img src="/screenshot/jd matcher.png" alt="Job Matching" />
  <p><em>Real-time job description analysis and matching</em></p>
</div>

1. **Paste a job description** into the matcher tool
2. **Get instant feedback** on your match percentage
3. **Review match reasons** highlighting your strengths
4. **See improvement suggestions** to increase your chances

### HR Interview Practice

<div align="center">
  <img src="/screenshot/chatbot.jpg" alt="Interview Practice" />
  <p><em>Comprehensive interview preparation with smart feedback</em></p>
</div>

1. **Browse interview questions** by category or search for specific topics
2. **Start a practice session** with the interactive chatbot
3. **Answer questions** and receive immediate feedback
4. **Review suggested answers** to improve your responses
5. **Track your progress** through the question library

### Resume Builder

<div align="center">
  <img src="/screenshot/resumebuilder1.jpg" alt="Resume Generation" />
  <p><em>Professional resume generation with customization options</em></p>
</div>

1. **Enter your professional details** including experience, education, and skills
2. **Customize section content** with your accomplishments and projects
3. **Generate a professional PDF** with proper formatting and layout
4. **Download your resume** ready for job applications

## 👨‍💻 Contributing

We welcome contributions to ResuMatch! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

 

 

## 🙏 Acknowledgements

- [PyMuPDF](https://github.com/pymupdf/PyMuPDF) for PDF parsing
- [ReportLab](https://www.reportlab.com/) for PDF generation
- [Django REST Framework](https://www.django-rest-framework.org/) for API development
- [SimpleJWT](https://github.com/jazzband/djangorestframework-simplejwt) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for frontend development

---
###                  ✨  HAPPY CODING ✨ 
<p align="center">
  <strong>ResuMatch</strong>   resume analysis and job matching
</p>
<p align="center">
  Made with ❤️ for job seekers everywhere
</p>