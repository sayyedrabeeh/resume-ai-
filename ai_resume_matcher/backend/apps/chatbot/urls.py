from django.urls import path
from .views import StartChatView, NextQuestionView

urlpatterns = [
    path("chatbot/start/", StartChatView.as_view()),
    path("chatbot/next/", NextQuestionView.as_view()),
]
