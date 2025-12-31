from django.shortcuts import render
import os
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
    
   
    try:
      profile = Profile.objects.get(user=request.user, is_current=True)
    except Profile.DoesNotExist:
      return Response({
        "count": 0,
        "matches": [],
        "message": "Profile not found. Please complete your profile."
    }, status=200)

  
    skills = [s.strip() for s in profile.skills.split(',') if s.strip()]
    keywords = " ".join(skills[:3]) or "software developer"
 
    params = {"query": keywords, "results_per_page": "20"}
    
     
    
    all_jobs = []    

    for page in range(1, 4):
        params["page"] = page
        res = requests.get(
            "https://jsearch.p.rapidapi.com/search",
            headers=headers,
            params=params,
            timeout=10
        )
        if res.status_code == 200:
            for job in res.json().get("data", []):
                all_jobs.append({
                    "title": job.get("job_title"),
                    "description": job.get("job_description"),
                    "company": job.get("employer_name"),
                    "url": job.get("job_apply_link"),
                    "source": "JSearch"
                })
    all_jobs.extend(fetch_remoteok_jobs(keywords))

 
    for p in range(1, 3):
        all_jobs.extend(fetch_muse_jobs(keywords, p))

     
    matched = []
    for job in all_jobs:
        score, _, _, _ = calculate_match_score(
            profile,
            f"{job['title']} {job['description']}"
        )
         
        job["score"] = score
        matched.append(job)
        
    matched.sort(key=lambda x: x["score"], reverse=True)
    return Response({
        "count": len(matched),
        "matches": matched
        })


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
    keywords = keyword.lower().split()
    try:
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            return []

        data = response.json()

        jobs = []

        for job in data[1:]: 
            text = f"{job.get('position','')} {job.get('description','')}".lower()

            if any(k in text for k in keywords):
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


import re

def strip_html(html):
    return re.sub(r"<.*?>", "", html or "")


def fetch_muse_jobs(keyword, page=1):
    url = "https://www.themuse.com/api/public/jobs"

    params = {
        "category": "Software Engineering",
        "level": "Mid Level",
    }

    try:
        response = requests.get(url, params=params, timeout=10)

        if response.status_code != 200:
            return []

        data = response.json()
        jobs = []

        for job in data.get("results", []):
            description = strip_html(job.get("contents"))

            text = f"{job.get('name', '')} {description}".lower()

            if keyword.lower() in text:
                jobs.append({
                    "title": job.get("name"),
                    "company": job.get("company", {}).get("name"),
                    "description": description,
                    "url": job.get("refs", {}).get("landing_page"),
                    "source": "The Muse"
                })

        return jobs

    except requests.exceptions.RequestException:
        return []


