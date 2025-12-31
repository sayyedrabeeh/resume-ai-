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
    
   
    profile = Profile.objects.get(user=request.user, is_current=True)
    
  
    keywords = ' '.join(profile.skills.split(',')[:1])   
    
    params = {
        "query": keywords,
        "page": "1",
        "results_per_page": "20",   
         
    }
    
    all_jobs = []
    
    
    for page_num in range(1, 6):   
        params["page"] = str(page_num)
        response = requests.get("https://jsearch.p.rapidapi.com/search", headers=headers, params=params)
        
        if response.status_code == 200:
            jobs = response.json().get("data", [])
            all_jobs.extend(jobs)   
        else:
             
            return Response({"error": "Failed to fetch jobs"}, status=500)

     
    matching_jobs = []
    
   
    for job in all_jobs:
        job_description = job.get("description", "") + " " + job.get("title", "")
        score, _, _, _ = calculate_match_score(profile, job_description)

        job_data = job.copy()
        job_data["score"] = score   
        matching_jobs.append(job_data)

    
    return Response({"matches": matching_jobs})


def fetch_jooble_jobs(keywords, location="", page=1):
    api_key = os.environ.get("JOOBLE_API_KEY")
    url = f"https://jooble.org/api/{api_key}"

    payload = {
        "keywords": keywords,
        "location": location,
        "page": page
    }

    response = requests.post(
        url,
        json=payload,
        headers={"Content-Type": "application/json"},
        timeout=10
    )

    if response.status_code == 200:
        return response.json().get("jobs", [])

    return []

def fetch_remoteok_jobs(keyword):
    url = "https://remoteok.com/api"

    headers = {
        "User-Agent": "Mozilla/5.0"  
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            return []

        data = response.json()

        jobs = []

        for job in data[1:]: 
            text = f"{job.get('position', '')} {job.get('description', '')}".lower()

            if keyword.lower() in text:
                jobs.append({
                    "title": job.get("position"),
                    "description": job.get("description"),
                    "company": job.get("company"),
                    "url": job.get("url"),
                    "source": "RemoteOK"
                })

        return jobs

    except requests.exceptions.RequestException:
        return []
