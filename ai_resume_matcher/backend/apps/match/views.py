from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.models import Profile
from users.serializers import Profileserilizer
from . matching import calculate_match_score
# Create your views here.


class MatchJobDescriptionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        job_description = request.data.get("job_description", "")
        try:
            profile = Profile.objects.get(user=request.user,is_current=True)
        except Profile.DoesNotExist:
            return Response({"error": "Current profile not found."}, status=404)
        score, reasons, missing_skills, suggestions = calculate_match_score(profile, job_description)
        return Response({
            "match_percentage": score,
            "reasons": reasons,
            "profile": Profileserilizer(profile).data,
            "missing_skills": missing_skills,
            "suggestions": suggestions,
        })
            

