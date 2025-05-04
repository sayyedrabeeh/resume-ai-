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
        "answer": "I am a motivated professional with experience in software development and a passion for learning new technologies."
    },
    {
        "id": 2,
        "question": "What are your strengths?",
        "answer": "I am a quick learner, good at problem-solving, and work well in a team."
    },
    {
        "id": 3,
        "question": "What are your weaknesses?",
        "answer": "Sometimes I take on too much responsibility, but I’m learning to delegate and prioritize better."
    },
    {
        "id": 4,
        "question": "Why should we hire you?",
        "answer": "I have the skills and experience you're looking for and I am eager to contribute to your team."
    },
    {
        "id": 5,
        "question": "Where do you see yourself in 5 years?",
        "answer": "I see myself in a leadership position, helping my team achieve its goals."
    },
    # ... Add up to 100 questions similarly
]

class StartChatView(APIView):
    def get(self, request):
        
        return Response({"question": HR_QUESTIONS[0]["question"], "id": HR_QUESTIONS[0]["id"]})

class NextQuestionView(APIView):
    def post(self, request):
        current_id = request.data.get("current_id")
        user_answer = request.data.get("user_answer")

        current_question = next(q for q in HR_QUESTIONS if q["id"] == current_id)
        correct_answer = current_question["answer"]

        
        feedback = "Good answer!" if correct_answer.lower() in user_answer.lower() else f"Suggested: {correct_answer}"

        next_index = current_id
        if current_id < len(HR_QUESTIONS):
            next_index += 1
            next_question = HR_QUESTIONS[next_index - 1]
            return Response({
                "feedback": feedback,
                "next_question": next_question["question"],
                "id": next_question["id"]
            })
        else:
            return Response({"feedback": feedback, "message": "Interview completed!"})
