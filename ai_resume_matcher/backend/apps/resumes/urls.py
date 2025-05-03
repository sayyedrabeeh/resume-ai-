# urls.py
from .views import GenerateResumeView
from django.urls import path

urlpatterns = [
    path('generate-resume/', GenerateResumeView.as_view(), name='generate_resume'),
]
