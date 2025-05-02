# 🚀 ResuMatch - AI-Powered Resume & Job Matching Platform

<div align="center">
  <img src="/api/placeholder/1200/300" alt="ResuMatch Banner" />
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

 

📹 [Watch Demo Video](https://youtube.com/example-video) comming soon 

 

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

### 👤 User Management & Authentication
- **Secure JWT Authentication**: Token-based security for all user sessions
- **Responsive Account Management**: Mobile-friendly user interface
- **Profile Selection System**: Easily switch between different resume profiles
- **Password Recovery**: Secure password reset functionality

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
- `POST /api/resume/upload/`: Upload and parse a new resume
- `GET /api/profiles/`: List all user profiles
- `GET /api/current-profile/`: Get current active profile
- `POST /api/set-current-profile/`: Set a profile as current

### Job Matching APIs
- `POST /api/match/match-job-description/`: Compare current profile with job description
- `GET /api/jobs/matching-jobs/`: Fetch matching jobs from external APIs

## 🖥️ Frontend Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Page footer
│   ├── JobCard.jsx     # Job display component
│   └── ...
├── pages/              # Page components
│   ├── Login.jsx       # User login
│   ├── Signup.jsx      # New user registration
│   ├── Dashboard.jsx   # Main user dashboard
│   ├── ResumeUpload.jsx # Resume upload interface
│   ├── JobMatcher.jsx  # Job matching tool
│   ├── JobMatches.jsx  # Matched jobs listing
│   ├── Profile.jsx     # User profile management
│   └── ...
├── api/                # API communication
│   ├── axiosInstance.js # Configured Axios client
│   └── axiosConfig.js  # Axios configuration
├── context/            # React context providers
│   ├── AuthContext.jsx # Authentication state
│   └── ...
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
└── App.jsx             # Main application component
```

### Key Frontend Features

1. **Responsive Design**: Mobile-first UI that works across all devices
2. **Interactive Job Cards**: Expandable job descriptions with match indicators
3. **Real-time Form Validation**: Immediate feedback on user inputs
4. **Loading States**: Visual feedback during API operations
5. **Token Management**: Automatic handling of JWT authentication

<div align="center">
  <img src="/api/placeholder/800/450" alt="Mobile Responsive Design" />
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
├── api/                  # API configuration
├── jobs/                 # External job integration
└── settings/             # Project settings
```

### Match Scoring Algorithm

ResuMatch uses a sophisticated algorithm to calculate match scores:

1. **Skill Extraction**: Identifies both single-word skills (e.g., "Python", "React") and multi-word skills (e.g., "machine learning", "project management")
2. **Proficiency Analysis**: Detects skill levels (beginner, intermediate, advanced)
3. **Summary Relevance**: Analyzes resume summary for keyword matches
4. **Experience Evaluation**: Considers years of experience and leadership roles
5. **Actionable Feedback**: Generates specific suggestions based on missing skills

<div align="center">
  <img src="/api/placeholder/800/300" alt="Match Algorithm Visualization" />
  <p><em>Visual representation of the match scoring algorithm</em></p>
</div>

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

## 🔧 Installation & Setup

### Prerequisites
- Node.js 16+
- Python 3.8+
- PostgreSQL 12+
- Redis (optional, for caching)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/resumatch.git
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

### Docker Setup
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🚀 Usage Examples

### User Registration Process

<div align="center">
  <img src="/api/placeholder/800/400" alt="Signup Process" />
  <p><em>Simple 3-step signup process for new users</em></p>
</div>

1. **Visit the signup page** and provide your email and password
2. **Verify your email address** through the confirmation link
3. **Complete your profile** by uploading your resume
4. **Start matching** with potential job opportunities

### Resume Upload & Analysis

<div align="center">
  <img src="/api/placeholder/800/400" alt="Resume Analysis" />
  <p><em>AI-powered resume analysis and information extraction</em></p>
</div>

1. **Upload your PDF resume** through the drag-and-drop interface
2. **Review extracted information** including skills, experience, and education
3. **Make any necessary corrections** to the extracted data
4. **Save your profile** for job matching

### Job Description Matching

<div align="center">
  <img src="/api/placeholder/800/400" alt="Job Matching" />
  <p><em>Real-time job description analysis and matching</em></p>
</div>

1. **Paste a job description** into the matcher tool
2. **Get instant feedback** on your match percentage
3. **Review match reasons** highlighting your strengths
4. **See improvement suggestions** to increase your chances

## 📈 Future Roadmap

### Phase 1: Core Enhancement (Q3 2025)
- **Resume Builder Tool**: Create optimized resumes based on target job descriptions
- **Interview Preparation**: Generate potential interview questions based on job-resume gaps
- **Enhanced Analytics Dashboard**: Track application success and improvement metrics

### Phase 2: Intelligence Upgrade (Q4 2025)
- **Machine Learning Integration**: ML-based skill extraction and recommendation system
- **Sentiment Analysis**: Detect positive/negative language in job descriptions
- **Salary Estimation**: Predict salary ranges based on job requirements

### Phase 3: Ecosystem Expansion (Q1 2026)
- **Mobile App**: Native mobile applications for iOS and Android
- **Browser Extension**: Analyze job listings while browsing job sites
- **Employer Portal**: Allow companies to post jobs and review matching candidates

## 👨‍💻 Contributing

We welcome contributions to ResuMatch! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [PyMuPDF](https://github.com/pymupdf/PyMuPDF) for PDF parsing
- [Django REST Framework](https://www.django-rest-framework.org/) for API development
- [SimpleJWT](https://github.com/jazzband/djangorestframework-simplejwt) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for frontend development

---

<p align="center">
  <strong>ResuMatch</strong> - AI-powered resume analysis and job matching
</p>
<p align="center">
  Made with ❤️ for job seekers everywhere
</p>