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



class ResumeUploadView(APIView):
    
    def post(self,request):
        
        resume_file = request.FILES.get('resume')

        if not resume_file:
           return Response({'error': 'resume not uploaded '}, status=status.HTTP_400_BAD_REQUEST)
        profile= Profile(resume=resume_file)
        profile.save()
        doc = fitz.open(profile.resume.path)
        text=''
        for page in doc :
            text += page.get_text()
        import re 

        email = re.findall(r'[\w\.-]+@[\w\.-]+', text)
        phone = re.findall(r'\+?\d[\d -]{8,12}\d', text)

        name = text.split('\n')[0]
        skills = "Python, Django, React"  
        education = "Bachelor of Technology" 
        experience = "2 years"   
        profile.name =name
        profile.email = email[0] if email else ''
        profile.phone = phone[0] if phone else ''

        profile.skills=skills
        profile.education =education
        profile.experience = experience
        profile.save()

        return Response(Profileserilizer(profile).data, status=status.HTTP_201_CREATED)
