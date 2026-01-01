from django.shortcuts import render
import os
import requests
import re
from match.matching import calculate_match_score
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.models import Profile
import logging

logger = logging.getLogger(__name__)

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
        try:
            res = requests.get(
                "https://jsearch.p.rapidapi.com/search",
                headers=headers,
                params=params,
                timeout=10
            )
            if res.status_code == 200:
                for job in res.json().get("data", []):
                    all_jobs.append({
                        "id": job.get("job_id") or job.get("id") or job.get("url"),
                        "title": job.get("job_title"),
                        "description": job.get("job_description"),
                        "company": job.get("employer_name"),
                        "employment_type": job.get("job_employment_type"),
                        "logo": job.get("employer_logo"),
                        "apply_links": job.get("apply_options", []),
                        "url": job.get("job_apply_link"),
                        "source": "JSearch"
                    })
                logger.info(f"JSearch page {page} returned {len(res.json().get('data', []))} jobs")
            else:
                logger.warning(f"JSearch page {page} failed with status {res.status_code}")
        except Exception as e:
            logger.error(f"JSearch page {page} error: {e}")

    
    try:
        remote_jobs = fetch_remoteok_jobs(keywords)
        logger.info(f"RemoteOK returned {len(remote_jobs)} jobs")
        all_jobs.extend(remote_jobs)
    except Exception as e:
        logger.error(f"RemoteOK failed: {e}")

    
    for p in range(1, 3):
        try:
            muse_jobs = fetch_muse_jobs(keywords, p)
            logger.info(f"Muse page {p} returned {len(muse_jobs)} jobs")
            all_jobs.extend(muse_jobs)
        except Exception as e:
            logger.error(f"Muse page {p} failed: {e}")

    for p in range(1, 3):
        try:
            jooble_jobs = fetch_jooble_jobs(keywords, page=p)
            logger.info(f"Jooble page {p} returned {len(jooble_jobs)} jobs")
            all_jobs.extend(jooble_jobs)
        except Exception as e:
            logger.error(f"Jooble page {p} failed: {e}")

    logger.info(f"Total jobs collected: {len(all_jobs)}")

    matched = []
    for job in all_jobs:
        score, reasons, unmatched, suggestions = calculate_match_score(
            profile,
            f"{job['title']} {job['description']}"
        )
        job["score"] = score
        job["reasons"] = reasons
        job["unmatched_skills"] = unmatched
        job["suggestions"] = suggestions
        matched.append(job)
        
    matched.sort(key=lambda x: x["score"], reverse=True)
    
    return Response({
        "count": len(matched),
        "matches": matched
    })


def fetch_jooble_jobs(keywords, location="", page=1):
    """Fetch jobs from Jooble API"""
    api_key = os.environ.get("JOOBLE_API_KEY")
    if not api_key:
        logger.warning("JOOBLE_API_KEY not set")
        return []
    
    url = f"https://jooble.org/api/{api_key}"

    payload = {
        "keywords": keywords,
        "location": location,
        "page": str(page)
    }

    try:
        response = requests.post(
            url,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )

        if response.status_code == 200:
            data = response.json()
            jobs = []
            
            for job in data.get("jobs", []):
                jobs.append({
                    "id": job.get("id") or job.get("link"),
                    "title": job.get("title"),
                    "description": job.get("snippet", ""),
                    "company": job.get("company"),
                    "employment_type": job.get("type", ""),
                    "logo": None,
                    "apply_links": [{"publisher": "Jooble", "apply_link": job.get("link")}],
                    "url": job.get("link"),
                    "source": "Jooble"
                })
            
            return jobs
        else:
            logger.warning(f"Jooble returned status {response.status_code}")
            return []
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Jooble API error: {e}")
        return []


def fetch_remoteok_jobs(keyword):
    """Fetch jobs from RemoteOK API"""
    url = "https://remoteok.com/api"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    keywords = keyword.lower().split()
    
    try:
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            logger.warning(f"RemoteOK returned status {response.status_code}")
            return []

        data = response.json()
        jobs = []

        for job in data[1:]: 
            if not isinstance(job, dict):
                continue
                
            text = f"{job.get('position', '')} {job.get('description', '')}".lower()

            if any(k in text for k in keywords):
                jobs.append({
                    "id": job.get("id") or job.get("url"),
                    "title": job.get("position"),
                    "description": job.get("description"),
                    "company": job.get("company"),
                    "employment_type": "Remote",
                    "logo": job.get("company_logo"),
                    "apply_links": [{"publisher": "RemoteOK", "apply_link": job.get("url")}],
                    "url": job.get("url"),
                    "source": "RemoteOK"
                })

        return jobs

    except requests.exceptions.RequestException as e:
        logger.error(f"RemoteOK API error: {e}")
        return []


def strip_html(html):
    """Remove HTML tags from text"""
    if not html:
        return ""
    return re.sub(r"<.*?>", "", html)


def fetch_muse_jobs(keyword, page=1):
    """Fetch jobs from The Muse API"""
    url = "https://www.themuse.com/api/public/jobs"

    params = {
        "category": "Software Engineering",
        "level": "Mid Level",
        "page": page
    }

    try:
        response = requests.get(url, params=params, timeout=10)

        if response.status_code != 200:
            logger.warning(f"Muse returned status {response.status_code}")
            return []

        data = response.json()
        jobs = []

        for job in data.get("results", []):
            description = strip_html(job.get("contents"))
            text = f"{job.get('name', '')} {description}".lower()
            keywords = keyword.lower().split()
            
            if any(k in text for k in keywords):
                company_name = ""
                if isinstance(job.get("company"), dict):
                    company_name = job.get("company", {}).get("name", "")
                location = ""
                locations = job.get("locations", [])
                if locations and isinstance(locations[0], dict):
                    location = locations[0].get("name", "")
                refs = job.get("refs", {})
                landing_page = refs.get("landing_page") if isinstance(refs, dict) else ""
                
                jobs.append({
                    "id": job.get("id"),
                    "title": job.get("name"),
                    "description": description,
                    "company": company_name,
                    "employment_type": location,
                    "logo": None,
                    "apply_links": [{"publisher": "The Muse", "apply_link": landing_page}],
                    "url": landing_page,
                    "source": "The Muse"
                })

        return jobs

    except requests.exceptions.RequestException as e:
        logger.error(f"Muse API error: {e}")
        return []