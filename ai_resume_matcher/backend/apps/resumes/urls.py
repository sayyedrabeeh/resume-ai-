# urls.py
from .views import GenerateResumeView,HRQuestionListView,RandomHRQuestionView
from django.urls import path

urlpatterns = [
    path('generate-resume/', GenerateResumeView.as_view(), name='generate_resume'),
    path('hr-questions/', HRQuestionListView.as_view()),
    path('hr-questions/random/', RandomHRQuestionView.as_view()),
]
