from django.db import models

# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=200)
    skills = models.TextField()
    education = models.TextField()
    expirence = models.TextField()
    resume = models.FileField(upload_to=('resumes/'))
    def __str__(self):
        return self.name
    
