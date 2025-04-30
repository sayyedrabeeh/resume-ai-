from django.urls import path
from .views import fetch_matching_jobs

urlpatterns = [
    path('matching-jobs/', fetch_matching_jobs),
]
