from django.shortcuts import render
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.models import Profile
from match.matching import calculate_match_score
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_matching_jobs(request):
     
    headers = {
    'x-rapidapi-key': "b31f7e6ccamshb505afe9264b9d4p11d38ejsn39a5aa53d1e9",
    'x-rapidapi-host': "jsearch.p.rapidapi.com"
}
    profile=Profile.objects.get(user=request.user,is_current= True)
    keywords = ' '.join(profile.skills.split(',')[:1])
     
    params = {
        "query": keywords,
        "page": "1",
        "num_pages": "2"  
    }
    response = requests.get("https://jsearch.p.rapidapi.com/search", headers=headers, params=params)
    print('response',response)
    if response.status_code == 200:
    
        print('Response Data:', response.json())
    
        jobs = response.json().get("data", [])
        print('Jobs:', jobs)
    if response.status_code != 200:
        return Response({"error": "Failed to fetch jobs"}, status=500)
    jobs = response.json().get("data", [])
    matching_jobs = []
    for job in jobs:
        job_description = job.get("description", "") + " " + job.get("title", "")
        score,_,_,_= calculate_match_score(profile, job_description)
         
        job_data = job.copy()   
        job_data["score"] = score   
        matching_jobs.append(job_data)
        print('matching_jobs :',matching_jobs)

    return Response({"matches": matching_jobs})