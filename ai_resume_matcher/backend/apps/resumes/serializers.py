 
from rest_framework import serializers
from .models import HRInterviewQuestion

class HRInterviewQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRInterviewQuestion
        fields = '__all__'
