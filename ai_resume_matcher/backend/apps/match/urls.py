from django.urls import path
from .views import MatchJobDescriptionView

urlpatterns = [
    path('match-job-description/', MatchJobDescriptionView.as_view(), name='match-job-description'),
]
