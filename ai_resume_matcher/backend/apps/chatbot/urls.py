 
from django.urls import path
from .views import HRQuestionsListView, StartChatView, NextQuestionView, RandomQuestionView

urlpatterns = [
    path('hr-questions/', HRQuestionsListView.as_view(), name='hr-questions-list'),
    path('hr-questions/start-chat/', StartChatView.as_view(), name='hr-start-chat'),
    path('hr-questions/next-question/', NextQuestionView.as_view(), name='hr-next-question'),
    path('hr-questions/random/', RandomQuestionView.as_view(), name='hr-random-question'),
]
 