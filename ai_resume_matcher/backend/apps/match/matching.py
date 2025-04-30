import re

def extract_skills_from_text(text):
    # Extract individual words from the job description
    words = re.findall(r'\b[a-zA-Z][a-zA-Z0-9+\-#]+\b', text.lower())

    # List of recognized skills
    common_skills = [
        "python", "java", "javascript", "react", "nodejs", "django", "rest", "api", 
        "sql", "mongodb", "html", "css", "aws", "docker", "git", "linux", "typescript", 
        "machine learning", "data analysis", "excel", "project management", "bigquery", 
        "spark", "flink", "kafka", "redis", "azure", "gcp", "snowflake", "postgresql",
        "etl", "dbt", "airflow", "fivetran", "powerbi", "quicksight", "lookerstudio", "ci/cd", 
        "cloud", "kafka streams", "faust", "confluent"
    ]
 
    return list({word for word in words if word in common_skills})


def calculate_match_score(profile, job_description):
    score = 0
    reasons = []
    suggestions = []

    jd_lower = job_description.lower()
    jd_skills = extract_skills_from_text(jd_lower)

    matched_skills = []
    unmatched_skills = []

    profile_skills = []

    if profile.skills:
         
        skills_raw = re.split(r'[,•\n]+', profile.skills)

        normalized_skills = []
        for s in skills_raw:
            skill = s.strip().lower()
            skill = re.sub(r'\(.*?\)', '', skill)   

             
            if "css" in skill:
                skill = "css"
            elif "c#" in skill:
                skill = "csharp"  
            elif "js" in skill and "javascript" not in skill:
                skill = "javascript"

            normalized_skills.append(skill)

        profile_skills = [s for s in normalized_skills if s]

        matched_skills = [skill for skill in jd_skills if skill in profile_skills]
        unmatched_skills = [skill for skill in jd_skills if skill not in profile_skills]

        if matched_skills:
            skill_match_score = int((len(matched_skills) / len(jd_skills)) * 100)
            score = skill_match_score
            reasons.append(f"Matched skills: {', '.join(matched_skills)}")
        else:
            reasons.append("No matching skills found.")

    
    if hasattr(profile, "summery") and profile.summery and profile.summery.lower() in jd_lower:
        score += 20
        reasons.append("Your summary aligns with the job description.")
    else:
        reasons.append("Your summary aligns with the job description.")

    
    if hasattr(profile, "expirence") and profile.expirence:
        score += 20
        reasons.append("Relevant experience detected.")
    else:
        reasons.append("No experience information found.")

    final_score = min(int(score), 98)

    
    if final_score < 50:
        suggestions.append("Consider searching for a different job that better matches your profile.")
        suggestions.append("Improve your resume by learning or adding relevant skills.")
    elif 50 <= final_score < 75:
        suggestions.append("Fair chance. Try tailoring your resume to this job.")
        suggestions.append("Consider gaining more experience or skills.")
    else:
        suggestions.append("Great match! Go ahead and apply.")
        suggestions.append("With some luck, this could be your next job!")

    return final_score, reasons, unmatched_skills, suggestions
