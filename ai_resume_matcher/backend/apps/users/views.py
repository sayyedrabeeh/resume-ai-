from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import fitz
from .models import Profile
from .serializers import Profileserilizer
import re
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import hashlib

def get_file_hash(file):
    hasher = hashlib.md5()
    for chunk in file.chunks():
        hasher.update(chunk)
    return hasher.hexdigest()


class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'username or password is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'username must be unique'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(username=username, email=email)
        user.set_password(password)  
        user.save()

        return Response({'message': 'account created successfully'}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)   
            })
        else:
            return Response({'error': 'invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated] 
     
    def post(self, request):
        resume_file = request.FILES.get('resume')
        print("resume_file :",resume_file)

        if not resume_file:
           return Response({'error': 'resume not uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        file_hash = get_file_hash(resume_file)
        if Profile.objects.filter(user=request.user, resume_hash=file_hash).exists():
               return Response({'error': 'You have already uploaded this resume. Please check you profile page .'}, status=status.HTTP_400_BAD_REQUEST)

        profile = Profile(user=request.user,resume=resume_file, resume_hash=file_hash)
        profile.save()
        
        doc = fitz.open(profile.resume.path)
        text = ''
        for page in doc:
            text += page.get_text()
 
        name = self.extract_name(text)
        email = self.extract_email(text)
        phone = self.extract_phone(text)
        
         
        summary = self.extract_summary(text)
        skills = self.extract_skills(text)
        education = self.extract_education(text)
        experience = self.extract_experience(text)
        projects = self.extract_projects(text)
        
         
        linkedin = self.extract_linkedin(text)
        github = self.extract_github(text)
        website = self.extract_website(text)
        
        
        certifications = self.extract_certifications(text)
        achievements = self.extract_achievements(text)
        
  
        profile.name = name
        profile.email = email
        profile.phone = phone
        profile.summery = summary
        profile.skills = skills
        profile.education = education
        profile.expirence = experience
        profile.projects = projects
        profile.linkedin = linkedin
        profile.github = github
        profile.website = website
        profile.certifications = certifications
        profile.achievements = achievements
        profile.save()

        return Response(Profileserilizer(profile).data, status=status.HTTP_201_CREATED)

    def extract_name(self, text):
        
        lines = text.strip().split('\n')
        for i in range(min(3, len(lines))):
            name_line = lines[i].strip()
         
            if name_line and len(name_line) < 50 and re.match(r'^[A-Za-z\s\.\-]+$', name_line):
                return name_line
        return "Name not found"

    def extract_email(self, text):
        emails = re.findall(r'[\w\.-]+@[\w\.-]+', text)
        return emails[0] if emails else ""
    
    def extract_phone(self, text):
        phones = re.findall(r'\+?\d[\d \-\(\)]{8,15}\d', text)
        return phones[0] if phones else ""
    
    def extract_summary(self, text):
        patterns = [
            r"(Profile Summary|Summary|Professional Summary|About Me)[\s\S]*?(?=(Technical Skills|Skills|Education|Experience|Projects|$))",
            r"(Objective)[\s\S]*?(?=(Technical Skills|Skills|Education|Experience|Projects|$))"
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return "Summary not found"
    
    def extract_skills(self, text):
        patterns = [
            r"(Technical Skills|Skills|Key Skills|Core Competencies)[\s\S]*?(?=(Projects|Education|Experience|Certifications|$))",
            r"(Technologies|Programming Languages|Tools & Technologies)[\s\S]*?(?=(Projects|Education|Experience|$))"
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return "Skills not found"
    
    def extract_education(self, text):
        patterns = [
            r"(Education|Qualifications|Academic Background|Educational Qualifications)[\s\S]*?(?=(Experience|Skills|Projects|Certifications|$))",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return "Education not found"
    
    def extract_experience(self, text):
        patterns = [
            r"(Experience|Work Experience|Professional Experience|Employment History|Work History)[\s\S]*?(?=(Education|Skills|Projects|Certifications|Achievements|$))",
            r"(Freelance|Internships)[\s\S]*?(?=(Education|Skills|Projects|$))"
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return "Experience not found"
    
    def extract_projects(self, text):
        patterns = [
            r"(Projects|Personal Projects|Key Projects|Professional Projects)[\s\S]*?(?=(Experience|Education|Skills|Certifications|Achievements|$))",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return "Projects not found"
    
    def extract_linkedin(self, text):
        patterns = [
            r"linkedin\.com/in/[\w\-]+",
            r"linkedin:?\s*[\w\-]+",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                link = match.group(0)
                if not link.startswith(('http://', 'https://')):
                    link = 'https://' + link
                return link
        
        return ""
    
    def extract_github(self, text):
        patterns = [
            r"github\.com/[\w\-]+",
            r"github:?\s*[\w\-]+",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                link = match.group(0)
                if not link.startswith(('http://', 'https://')):
                    link = 'https://' + link
                return link
        
        return ""
    
    def extract_website(self, text):
        patterns = [
            r"(website|portfolio|personal site):?\s*(https?://[\w\-\.]+\.\w+[\w\-\./]*)",
            r"(https?://[\w\-\.]+\.\w+[\w\-\./]*)",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                if len(match.groups()) > 1:
                    return match.group(2)
                return match.group(0)
        
        return ""
    
    def extract_certifications(self, text):
        patterns = [
            r"(Certifications|Certificates|Professional Certifications)[\s\S]*?(?=(Experience|Education|Skills|Projects|Achievements|$))",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return "Certifications not found"
    
    def extract_achievements(self, text):
        patterns = [
            r"(Achievements|Awards|Honors|Accomplishments)[\s\S]*?(?=(Experience|Education|Skills|Projects|Certifications|$))",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return "Achievements not found"