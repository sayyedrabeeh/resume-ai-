from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profiles")
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=200)
    skills = models.TextField(default="Not Provided")
    education = models.TextField(default="Not Provided")
    expirence = models.TextField(default="Not Provided")
    summery = models.TextField(default="Not Provided")
    resume = models.FileField(upload_to=('resumes/'))
    projects = models.TextField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    website = models.URLField(blank=True)
    certifications = models.TextField(blank=True)
    achievements = models.TextField(blank=True)
    resume_hash = models.CharField(max_length=64, blank=True, null=True)  
    is_current = models.BooleanField(default=False) 
    
    def __str__(self):
        return self.name
    
