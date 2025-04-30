import re

def extract_skills_from_text(text):
     
    word_skills = re.findall(r'\b[a-zA-Z][a-zA-Z0-9+\-#]+\b', text.lower())
    
  
    multi_word_skills = [
        "machine learning", "data analysis", "data science", "data engineering",
        "project management", "product management", "devops engineer",
        "cloud architecture", "systems design", "database administration",
        "front end", "back end", "full stack", "user experience", "user interface",
        "ci/cd", "test driven", "agile methodology", "scrum master",
        "business intelligence", "data visualization", "big data",
        "natural language processing", "computer vision"
    ]
     
    found_multi_word = []
    for skill in multi_word_skills:
        if skill in text.lower():
            found_multi_word.append(skill)
 
    common_skills = [
        "python", "java", "javascript", "react", "nodejs", "django", "rest", "api", 
        "sql", "mongodb", "html", "css", "aws", "docker", "git", "linux", "typescript", 
        "excel", "bigquery", "spark", "flink", "kafka", "redis", "azure", "gcp", 
        "snowflake", "postgresql", "mysql", "oracle", "nosql", "tableau", "tensorflow",
        "pytorch", "etl", "dbt", "airflow", "fivetran", "powerbi", "quicksight", 
        "lookerstudio", "metabase", "cloud", "kubernetes", "terraform", "ansible",
        "jenkins", "github", "gitlab", "bitbucket", "jira", "confluence", "slack",
        "teamcity", "circleci", "travis", "prometheus", "grafana", "datadog", "splunk",
        "elasticsearch", "cassandra", "hadoop", "scala", "rust", "go", "golang", "c++",
        "csharp", "php", "ruby", "swift", "kotlin", "flutter", "react native", "vue",
        "angular", "svelte", "nextjs", "gatsby", "laravel", "symfony", "flask", "fastapi",
        "spring", "hibernate", "kafka streams", "faust", "confluent", "pandas", "numpy",
        "matplotlib", "scikit", "pytest", "jest", "mocha", "cypress", "selenium", "playwright"
    ]
    
     
    single_word_skills = list({word for word in word_skills if word in common_skills})
    all_skills = single_word_skills + found_multi_word
    
    return all_skills


def calculate_match_score(profile, job_description):
    score = 0
    reasons = []
    suggestions = []

    jd_lower = job_description.lower()
    jd_skills = extract_skills_from_text(jd_lower)
    
    
    key_phrases = ["years of experience", "degree", "bachelor", "master", "phd", 
                   "team", "leadership", "manage", "communication", "remote", "on-site",
                   "startup", "enterprise", "agile", "scrum", "kanban", "deadline", 
                   "fast-paced", "collaborate", "independent", "problem solving"]
    
    job_phrases = [phrase for phrase in key_phrases if phrase in jd_lower]

    matched_skills = []
    unmatched_skills = []
    
   
    skill_proficiency = {
        "beginner": 0,
        "intermediate": 0,
        "advanced": 0
    }

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
                
            
            if "advanced" in skill or "expert" in skill or "senior" in skill:
                skill_proficiency["advanced"] += 1
            elif "intermediate" in skill or "experienced" in skill:
                skill_proficiency["intermediate"] += 1
            elif "beginner" in skill or "basic" in skill or "familiar" in skill:
                skill_proficiency["beginner"] += 1
            else:
                 
                skill_proficiency["intermediate"] += 1

            normalized_skills.append(skill)

        profile_skills = [s for s in normalized_skills if s]

        matched_skills = [skill for skill in jd_skills if skill in profile_skills]
        unmatched_skills = [skill for skill in jd_skills if skill not in profile_skills]

        if matched_skills:
            skill_match_score = int((len(matched_skills) / len(jd_skills)) * 100)
            score = skill_match_score
            reasons.append(f"📊 Skill Match Rate: {len(matched_skills)}/{len(jd_skills)} ({skill_match_score}%)")
            reasons.append(f"✅ Matched Skills: {', '.join(matched_skills)}")
            
            
            if skill_proficiency["advanced"] > 0:
                reasons.append(f"🔥 Strong proficiency detected in {skill_proficiency['advanced']} skills")
            
           
            tech_skills = [s for s in matched_skills if s in ["python", "java", "javascript", "sql", "aws", "docker"]]
            if tech_skills and len(tech_skills) >= 3:
                reasons.append(f"💻 Strong technical foundation with {len(tech_skills)} core tech skills")
            
            
            if len(matched_skills) > len(jd_skills) * 0.7:  
                reasons.append(f"🏆 You match {int(len(matched_skills)/len(jd_skills)*100)}% of required skills, positioning you above average candidates")
        else:
            reasons.append("⚠️ No matching skills detected in your profile vs. job requirements.")
            reasons.append("❗ Consider reviewing the job requirements carefully and update your profile")

    
    if hasattr(profile, "summery") and profile.summery:
        summary_lower = profile.summery.lower()
        summary_words = summary_lower.split()
        
         
        if len(summary_words) > 30:
            
            jd_words = jd_lower.split()
            overlap_count = len(set(summary_words).intersection(set(jd_words)))
            
            if overlap_count > 10:
                score += 20
                reasons.append(f"📝 Strong summary with {overlap_count} keywords matching job description terms")
            elif overlap_count > 5:
                score += 10
                reasons.append(f"📋 Your summary has moderate keyword alignment ({overlap_count} matches)")
            else:
                reasons.append("📄 Summary present but lacks strong alignment with job keywords")
                suggestions.append("🔍 Revise your summary to include more specific terminology from the job posting")
        else:
            suggestions.append("📏 Your summary is too brief - expand it to include more relevant experience and skills")
    else:
        suggestions.append("📋 Missing summary section - add a compelling personal statement aligned with job requirements")

    
    if hasattr(profile, "expirence") and profile.expirence:
        exp_text = profile.expirence.lower()
        
         
        year_match = re.search(r'(\d+)[\+]?\s*years?', exp_text)
        if year_match:
            years = int(year_match.group(1))
            if years >= 5:
                score += 20
                reasons.append(f"🏅 Impressive experience profile with {years}+ years relevant background")
            elif years >= 3:
                score += 15
                reasons.append(f"⏱️ Solid experience level with {years} years in the field")
            else:
                score += 10
                reasons.append(f"🔄 Early career profile with {years} years experience")
        else:
            score += 10
            reasons.append("🔍 Experience section present but years of experience unclear")
            
        
        leadership_terms = ["lead", "manage", "director", "head", "supervisor"]
        if any(term in exp_text for term in leadership_terms):
            score += 5
            reasons.append("👑 Leadership experience detected - valuable for career progression")
    else:
        suggestions.append("⚠️ No experience information detected - add detailed work history to improve scoring")

    final_score = min(int(score), 98)

     
    if final_score < 50:
        suggestions.append(f"📉 Low match score ({final_score}%) - consider positions better aligned with your current skill set")
        suggestions.append(f"🎯 Critical skills gap: {', '.join(unmatched_skills[:3])} are priority areas for development")
        suggestions.append(f"📚 Recommended: Take online courses in {', '.join(unmatched_skills[:2])} to boost your profile")
        suggestions.append(f"🔄 Consider applying for more junior positions while developing these skills")
    elif 50 <= final_score < 75:
        suggestions.append(f"📊 Moderate match score ({final_score}%) - tailor resume to emphasize matching skills")
        suggestions.append(f"💡 Focus on acquiring these skills to improve match: {', '.join(unmatched_skills[:2])}")
        suggestions.append(f"✏️ Rewrite your summary highlighting how your {', '.join(matched_skills[:3])} skills apply to this role")
        suggestions.append(f"🧩 Consider adding relevant project examples showcasing your {', '.join(matched_skills[:2])} abilities")
    else:
        suggestions.append(f"🌟 Strong match score ({final_score}%) - excellent alignment with position requirements!")
        suggestions.append(f"💪 Your profile demonstrates {len(matched_skills)} of {len(jd_skills)} required skills")
        suggestions.append(f"📈 Tip: Highlight measurable achievements with these skills in your application")
        suggestions.append(f"🎤 Prepare to discuss your expertise in {', '.join(matched_skills[:3])} during interviews")

    return final_score, reasons, unmatched_skills, suggestions