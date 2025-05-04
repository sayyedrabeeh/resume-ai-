from django.shortcuts import render
from rest_framework.response import Response
from .models import HRInterviewQuestion
from .serializers import HRInterviewQuestionSerializer
import random
from rest_framework.views import APIView
 
HR_QUESTIONS = [
    {
        "id": 1,
        "question": "Tell me about yourself.",
        "answer": "I am a motivated professional with experience in software development and a passion for learning new technologies.",
        "category": "Background"
    },
    {
        "id": 2,
        "question": "What are your strengths?",
        "answer": "I am a quick learner, good at problem-solving, and work well in a team.",
        "category": "Self-Assessment"
    },
    {
        "id": 3,
        "question": "What are your weaknesses?",
        "answer": "Sometimes I take on too much responsibility, but I'm learning to delegate and prioritize better.",
        "category": "Self-Assessment"
    },
    {
        "id": 4,
        "question": "Why should we hire you?",
        "answer": "I have the skills and experience you're looking for and I am eager to contribute to your team.",
        "category": "Motivation"
    },
    {
        "id": 5,
        "question": "Where do you see yourself in 5 years?",
        "answer": "I see myself in a leadership position, helping my team achieve its goals.",
        "category": "Career Goals"
    },
    {
        "id": 86,
        "question": "What experience do you have with remote or hybrid work environments?",
        "answer": "Describe your experience with virtual collaboration, highlighting specific tools and practices that have helped you remain productive, communicative, and connected with team members while working remotely. Emphasize your self-discipline and ability to manage boundaries effectively.",
        "category": "Work Style"
    }
    
]

class HRQuestionsListView(APIView):
   
    def get(self, request):
        
        return Response(HR_QUESTIONS)

class StartChatView(APIView):
     
    def get(self, request):
         
        return Response({
            "question": HR_QUESTIONS[0]["question"], 
            "id": HR_QUESTIONS[0]["id"]
        })

class NextQuestionView(APIView):
    
    def post(self, request):
        current_id = request.data.get("current_id")
        user_answer = request.data.get("user_answer")

    
        current_question = next((q for q in HR_QUESTIONS if q["id"] == current_id), None)
        
        if not current_question:
            return Response({"error": "Question not found"}, status=404)
            
        correct_answer = current_question["answer"]
 
        feedback = "Good answer!" if any(keyword.lower() in user_answer.lower() 
                                         for keyword in correct_answer.lower().split() 
                                         if len(keyword) > 4) else f"Suggested: {correct_answer}"

        
        next_index = next((i for i, q in enumerate(HR_QUESTIONS) if q["id"] == current_id), -1)
        
        if next_index != -1 and next_index < len(HR_QUESTIONS) - 1:
            next_question = HR_QUESTIONS[next_index + 1]
            return Response({
                "feedback": feedback,
                "next_question": next_question["question"],
                "id": next_question["id"]
            })
        else:
            return Response({
                "feedback": feedback, 
                "message": "Interview completed! Well done on completing the practice session."
            })

class RandomQuestionView(APIView):
 
    def get(self, request):
        random_question = random.choice(HR_QUESTIONS)
        return Response(random_question)

