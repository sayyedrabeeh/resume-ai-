from django.shortcuts import render
from rest_framework.response import Response
from .models import HRInterviewQuestion
from .serializers import HRInterviewQuestionSerializer
import random
from rest_framework.views import APIView
 
HR_QUESTIONS= [
  {
    "id": 1,
    "question": "Tell me about yourself.",
    "answer": "When answering this question, focus on your professional background, relevant experience, and qualifications that make you suitable for the role. Keep your answer concise (1-2 minutes), well-structured, and tailored to the position you're applying for.",
    "category": "Introduction"
  },
  {
    "id": 2,
    "question": "What are your greatest strengths?",
    "answer": "Choose 2-3 strengths that are relevant to the position. Provide specific examples of how these strengths have benefited previous employers. Focus on skills like problem-solving, leadership, communication, adaptability, or technical expertise directly applicable to the role.",
    "category": "Self-Assessment"
  },
  {
    "id": 3,
    "question": "What is your greatest weakness?",
    "answer": "Select a genuine weakness that won't directly impact your job performance. More importantly, describe the specific steps you're taking to overcome this weakness, showing self-awareness and a commitment to professional growth.",
    "category": "Self-Assessment"
  },
  {
    "id": 4,
    "question": "Why do you want to work for this company?",
    "answer": "Demonstrate that you've researched the company by mentioning specific aspects that appeal to you: their values, culture, products/services, innovation, or growth trajectory. Explain how your skills and career goals align with the company's mission and the position you're applying for.",
    "category": "Motivation"
  },
  {
    "id": 5,
    "question": "Why should we hire you?",
    "answer": "Summarize your most relevant qualifications, skills, and experiences that match the job requirements. Highlight your unique value proposition - what sets you apart from other candidates and how you can specifically contribute to the company's success.",
    "category": "Motivation"
  },
  {
    "id": 6,
    "question": "Where do you see yourself in 5 years?",
    "answer": "Outline realistic career aspirations that align with the natural progression from the position you're applying for. Demonstrate ambition while showing commitment to growing with the company. Express interest in developing expertise and possibly taking on greater responsibilities.",
    "category": "Career Goals"
  },
  {
    "id": 7,
    "question": "Describe a challenging work situation and how you overcame it.",
    "answer": "Use the STAR method (Situation, Task, Action, Result) to describe a specific work challenge. Focus on your problem-solving process, the actions you took, and the positive outcome. Emphasize the skills you demonstrated and lessons you learned.",
    "category": "Behavioral"
  },
  {
    "id": 8,
    "question": "How do you handle stress and pressure?",
    "answer": "Describe specific strategies you use to manage stress effectively: prioritization techniques, time management, breaking down complex tasks, or mindfulness practices. Provide an example of performing well under pressure in a previous role.",
    "category": "Behavioral"
  },
  {
    "id": 9,
    "question": "What is your leadership style?",
    "answer": "Describe your approach to guiding teams, making decisions, and achieving goals. Mention adaptability to different situations and team members. Provide a brief example demonstrating your leadership effectiveness and the positive results achieved.",
    "category": "Leadership"
  },
  {
    "id": 10,
    "question": "How do you handle conflict in the workplace?",
    "answer": "Outline your approach: addressing issues directly but respectfully, actively listening to understand different perspectives, focusing on common goals, and finding mutually beneficial solutions. Provide a brief example of successfully resolving a workplace conflict.",
    "category": "Interpersonal Skills"
  },
  {
    "id": 11,
    "question": "What are your salary expectations?",
    "answer": "Research industry salary standards for your role, location, and experience level. Provide a reasonable range rather than a specific figure, indicating flexibility. Emphasize that while compensation is important, you're also interested in growth opportunities and value alignment.",
    "category": "Practical"
  },
  {
    "id": 12,
    "question": "Why are you leaving your current job?",
    "answer": "Focus on professional growth and new opportunities rather than negative aspects of your current position. Express what you're moving toward (new challenges, skills development, alignment with career goals) rather than what you're leaving behind.",
    "category": "Background"
  },
  {
    "id": 13,
    "question": "Describe your ideal work environment.",
    "answer": "Describe elements that help you perform your best while ensuring they align with the company's known culture. Mention factors like collaborative teamwork, opportunities for innovation, clear communication, or structured processes, depending on what's relevant to the role.",
    "category": "Work Style"
  },
  {
    "id": 14,
    "question": "How do you prioritize your work?",
    "answer": "Explain your methodology for assessing task urgency and importance, such as using prioritization matrices, deadlines, and business impact. Describe how you stay organized, manage your time effectively, and adapt when priorities shift unexpectedly.",
    "category": "Work Style"
  },
  {
    "id": 15,
    "question": "Tell me about a time you made a mistake and how you handled it.",
    "answer": "Choose a genuine but not catastrophic error. Focus on your response: taking responsibility, implementing corrective actions, learning from the experience, and preventing similar mistakes in the future. Demonstrate growth and accountability rather than blame-shifting.",
    "category": "Behavioral"
  },
  {
    "id": 16,
    "question": "How would your colleagues describe you?",
    "answer": "Select 3-4 positive traits colleagues would genuinely attribute to you. Include both professional qualities (analytical, detail-oriented, innovative) and interpersonal attributes (supportive, collaborative, reliable). If possible, reference actual feedback you've received.",
    "category": "Self-Assessment"
  },
  {
    "id": 17,
    "question": "What motivates you?",
    "answer": "Identify intrinsic motivators like solving complex problems, helping others, creating innovative solutions, achieving goals, or continual learning. Connect these motivations to the position and company you're applying for, showing alignment with their values and objectives.",
    "category": "Motivation"
  },
  {
    "id": 18,
    "question": "Describe your work ethic.",
    "answer": "Highlight key attributes like reliability, dedication, thoroughness, and integrity. Provide a concrete example demonstrating your strong work ethic from a previous role, focusing on your approach to responsibilities and the results you achieved.",
    "category": "Work Style"
  },
  {
    "id": 19,
    "question": "How do you stay organized?",
    "answer": "Describe specific systems and tools you use for organization: digital calendars, task management applications, note-taking methods, or prioritization frameworks. Explain how these methods help you meet deadlines, track projects, and maintain productivity.",
    "category": "Work Style"
  },
  {
    "id": 20,
    "question": "What achievement are you most proud of?",
    "answer": "Select a significant professional achievement relevant to the role. Describe the situation, your specific contributions, challenges overcome, and measurable results. Explain why this accomplishment matters to you personally and professionally.",
    "category": "Background"
  },
  {
    "id": 21,
    "question": "How do you approach learning new skills?",
    "answer": "Outline your learning methodology: identifying knowledge gaps, utilizing varied resources (courses, books, mentors), applying new knowledge through practice, seeking feedback, and continuous improvement. Provide an example of successfully acquiring a relevant skill.",
    "category": "Professional Development"
  },
  {
    "id": 22,
    "question": "Tell me about a time you had to adapt to a significant change.",
    "answer": "Use the STAR method to describe a major workplace change (reorganization, new technology, shifting priorities). Focus on your adaptability, positive attitude, proactive approach to understanding the change, and successful adjustment to new circumstances.",
    "category": "Adaptability"
  },
  {
    "id": 23,
    "question": "How do you work in a team?",
    "answer": "Describe your collaborative approach: active listening, respecting diverse perspectives, reliable contribution, supporting team members, and focusing on common goals. Provide a brief example of successful teamwork from your experience.",
    "category": "Teamwork"
  },
  {
    "id": 24,
    "question": "How do you handle criticism or feedback?",
    "answer": "Express your view of feedback as valuable for growth. Describe your process: listening actively without defensiveness, asking clarifying questions, reflecting honestly, creating an improvement plan, and following up. Provide a brief example if possible.",
    "category": "Professional Development"
  },
  {
    "id": 25,
    "question": "Describe a situation where you had to work under a tight deadline.",
    "answer": "Use the STAR method to describe managing a time-sensitive project. Highlight your planning, prioritization, focus, and possibly delegation skills. Emphasize how you maintained quality while meeting the deadline, and any lessons learned.",
    "category": "Work Style"
  },
  {
    "id": 26,
    "question": "What are your career goals?",
    "answer": "Outline both short-term and long-term professional aspirations that naturally align with the position and company. Demonstrate ambition balanced with realistic expectations, and explain how this role fits into your broader career path.",
    "category": "Career Goals"
  },
  {
    "id": 27,
    "question": "How do you make difficult decisions?",
    "answer": "Describe your decision-making process: gathering relevant information, evaluating options against clear criteria, considering potential outcomes, consulting appropriate stakeholders, and making timely choices. Provide a brief example of a tough decision you made successfully.",
    "category": "Problem Solving"
  },
  {
    "id": 28,
    "question": "What do you know about our company?",
    "answer": "Demonstrate thorough research: the company's mission, values, products/services, market position, recent developments, and company culture. Show genuine interest and explain why these aspects appeal to you professionally.",
    "category": "Company Knowledge"
  },
  {
    "id": 29,
    "question": "How do you define success?",
    "answer": "Balance achievement-oriented metrics (meeting goals, delivering results) with growth-focused elements (learning, improvement, teamwork). Align your definition with the company's values and explain how you apply this view of success in your work.",
    "category": "Motivation"
  },
  {
    "id": 30,
    "question": "Tell me about a time you demonstrated leadership skills.",
    "answer": "Use the STAR method to describe taking initiative beyond your formal role. Focus on how you inspired others, overcame challenges, made decisions, and achieved positive outcomes. Highlight transferable leadership qualities relevant to the position.",
    "category": "Leadership"
  },
  {
    "id": 31,
    "question": "How do you maintain work-life balance?",
    "answer": "Describe strategies that help you stay productive and engaged at work while maintaining personal well-being: effective time management, setting boundaries, prioritization, and self-care practices. Emphasize your reliability in meeting professional commitments.",
    "category": "Work Style"
  },
  {
    "id": 32,
    "question": "What interests you about this position?",
    "answer": "Highlight specific aspects of the role that align with your skills, experience, and career goals. Reference job description details and explain why these responsibilities energize you. Connect your interest to the potential value you can bring to the position.",
    "category": "Motivation"
  },
  {
    "id": 33,
    "question": "Describe your communication style.",
    "answer": "Outline your approach to communication: clarity, active listening, adaptation to audience and context, and thoughtfulness. Mention your effectiveness in different formats (written, verbal, presentations). Provide a brief example demonstrating successful communication.",
    "category": "Communication"
  },
  {
    "id": 34,
    "question": "How do you handle multiple competing priorities?",
    "answer": "Explain your approach: assessing urgency and importance, communicating with stakeholders about realistic timelines, breaking down complex projects, delegating when appropriate, and staying flexible while maintaining focus. Provide a brief example of juggling multiple responsibilities successfully.",
    "category": "Work Style"
  },
  {
    "id": 35,
    "question": "What is your greatest professional achievement?",
    "answer": "Choose an accomplishment directly relevant to the position. Describe the situation, your specific actions, obstacles overcome, and quantifiable results. Explain which skills this achievement demonstrates and how they transfer to the role you're seeking.",
    "category": "Background"
  },
  {
    "id": 36,
    "question": "Tell me about a time you went above and beyond for a customer/client.",
    "answer": "Use the STAR method to describe exceeding expectations in serving a customer or stakeholder. Highlight your initiative, problem-solving approach, and commitment to excellence. Emphasize the positive outcome and any recognition or learning that resulted.",
    "category": "Customer Service"
  },
  {
    "id": 37,
    "question": "How do you stay current in your field?",
    "answer": "Describe specific methods you use for professional development: industry publications, courses, conferences, networking groups, certifications, or mentorships. Demonstrate a proactive approach to learning and give examples of how staying current has benefited your work.",
    "category": "Professional Development"
  },
  {
    "id": 38,
    "question": "What's the most challenging project you've worked on?",
    "answer": "Select a complex project relevant to the position. Describe the challenges, your approach to overcoming them, specific actions taken, and successful outcomes. Highlight transferable skills and lessons learned that apply to the role you're seeking.",
    "category": "Background"
  },
  {
    "id": 39,
    "question": "How would you describe your problem-solving approach?",
    "answer": "Outline your methodology: defining the problem clearly, analyzing root causes, gathering relevant information, developing multiple solutions, evaluating options, implementing the best approach, and assessing results. Provide a brief example demonstrating this process.",
    "category": "Problem Solving"
  },
  {
    "id": 40,
    "question": "What experience do you have working with diverse teams?",
    "answer": "Describe your experience collaborating with colleagues of different backgrounds, perspectives, or working styles. Highlight your approach to inclusion, respect for diverse viewpoints, and how diversity has enhanced team performance and outcomes in your experience.",
    "category": "Diversity & Inclusion"
  },
  {
    "id": 41,
    "question": "How do you deal with ambiguity in the workplace?",
    "answer": "Explain your approach: gathering available information, breaking down complex situations into manageable components, identifying what you can control, adapting quickly as clarity emerges, and maintaining productivity despite uncertainty. Provide a brief example if possible.",
    "category": "Adaptability"
  },
  {
    "id": 42,
    "question": "What do you find most rewarding about your current/previous position?",
    "answer": "Identify aspects that genuinely motivated you: specific responsibilities, skill development, collaboration, impact, or achievements. Connect these rewarding elements to the position you're applying for, showing alignment between your sources of satisfaction and the new role.",
    "category": "Motivation"
  },
  {
    "id": 43,
    "question": "Describe a situation where you had to influence others without formal authority.",
    "answer": "Use the STAR method to describe persuading colleagues, building consensus, or gaining buy-in. Focus on communication techniques, relationship building, and understanding others' perspectives. Highlight the positive outcome achieved through influence rather than position power.",
    "category": "Leadership"
  },
  {
    "id": 44,
    "question": "How do you approach delegating tasks?",
    "answer": "Outline your delegation process: assessing team members' strengths, clearly communicating expectations, providing necessary resources and context, establishing check-in points, offering support without micromanaging, and providing constructive feedback. Provide a brief example of successful delegation.",
    "category": "Leadership"
  },
  {
    "id": 45,
    "question": "Tell me about a time you failed and what you learned.",
    "answer": "Choose a situation with a genuine setback that led to meaningful learning. Briefly describe what happened, take ownership without making excuses, and focus on the specific lessons learned and how you've applied them successfully since then.",
    "category": "Resilience"
  },
  {
    "id": 46,
    "question": "What is your approach to meeting deadlines?",
    "answer": "Describe your methodology: breaking down projects into manageable tasks, setting personal milestones ahead of final deadlines, prioritizing effectively, anticipating potential obstacles, communicating proactively if issues arise, and consistently delivering quality work on time.",
    "category": "Work Style"
  },
  {
    "id": 47,
    "question": "How do you build relationships with colleagues?",
    "answer": "Explain your approach: expressing genuine interest, active listening, offering assistance, demonstrating reliability, participating in appropriate team activities, communicating effectively, and treating everyone with respect regardless of position. Briefly mention successful professional relationships you've developed.",
    "category": "Interpersonal Skills"
  },
  {
    "id": 48,
    "question": "What role do you typically play in a team?",
    "answer": "Describe your natural team contributions (facilitator, implementer, coordinator, specialist, etc.) while emphasizing your adaptability to fill different roles as needed. Provide a brief example of how your preferred role has contributed to team success.",
    "category": "Teamwork"
  },
  {
    "id": 49,
    "question": "How do you approach learning from mistakes?",
    "answer": "Outline your process: acknowledging errors without defensiveness, analyzing what went wrong and why, taking responsibility, identifying specific improvements, implementing corrective measures, and using the experience to strengthen your work going forward.",
    "category": "Professional Development"
  },
  {
    "id": 50,
    "question": "Describe a time when you had to adapt your communication style.",
    "answer": "Use the STAR method to describe adjusting your approach for different stakeholders, situations, or cultural contexts. Emphasize your awareness, flexibility, and the positive outcome achieved through tailored communication.",
    "category": "Communication"
  },
  {
    "id": 51,
    "question": "What would your previous manager say about you?",
    "answer": "Focus on realistic positive feedback you've received in performance reviews or conversations. Include both professional competencies and work ethic/character attributes. If possible, reference specific praiseworthy situations your manager observed.",
    "category": "Background"
  },
  {
    "id": 52,
    "question": "How do you handle tight deadlines or high-pressure situations?",
    "answer": "Describe your approach: staying calm, breaking work into manageable segments, prioritizing effectively, focusing on solutions rather than stress, knowing when to ask for help, and maintaining quality while working efficiently. Provide a brief example of performing well under pressure.",
    "category": "Work Style"
  },
  {
    "id": 53,
    "question": "What are your expectations for this role?",
    "answer": "Demonstrate realistic understanding of the position's responsibilities and growth trajectory. Balance mentioning opportunities for contribution and development with showing you understand the role's challenges. Align your expectations with what the company can reasonably offer.",
    "category": "Practical"
  },
  {
    "id": 54,
    "question": "How do you approach building rapport with clients/customers?",
    "answer": "Outline your methodology: active listening to understand needs, demonstrating reliability, communicating clearly, providing consistent value, showing genuine interest in their success, and thoughtfully addressing concerns. Provide a brief example of successful relationship building.",
    "category": "Customer Service"
  },
  {
    "id": 55,
    "question": "Tell me about a time you had to learn something quickly.",
    "answer": "Use the STAR method to describe rapidly acquiring necessary knowledge or skills. Highlight your learning strategies, resourcefulness, perseverance, and how you successfully applied the new knowledge, demonstrating your adaptability and capacity for growth.",
    "category": "Adaptability"
  },
  {
    "id": 56,
    "question": "How do you measure success in your current role?",
    "answer": "Describe specific metrics and outcomes you track: quantitative measures (targets, KPIs, deadlines) and qualitative indicators (stakeholder satisfaction, team development, quality standards). Show alignment between your performance evaluation and organizational goals.",
    "category": "Work Style"
  },
  {
    "id": 57,
    "question": "What do you think are the key qualities for success in this position?",
    "answer": "Identify 3-4 critical attributes based on the job description and company values (technical skills, soft skills, character traits). Explain why each is important and briefly demonstrate how you embody these qualities through relevant examples.",
    "category": "Company Knowledge"
  },
  {
    "id": 58,
    "question": "Describe a situation where you had to use data to make a decision.",
    "answer": "Use the STAR method to describe analyzing information, identifying patterns or insights, weighing options based on evidence, implementing a data-driven solution, and achieving positive results. Demonstrate analytical thinking and objective decision-making.",
    "category": "Problem Solving"
  },
  {
    "id": 59,
    "question": "How do you approach giving feedback to others?",
    "answer": "Describe your methodology: being timely, specific, and constructive; balancing positive recognition with improvement opportunities; focusing on behaviors rather than personalities; and ensuring privacy. Provide a brief example of giving effective feedback that led to positive change.",
    "category": "Leadership"
  },
  {
    "id": 60,
    "question": "What aspects of your work are you most passionate about?",
    "answer": "Identify specific responsibilities or outcomes that genuinely energize you, ensuring they align with the position requirements. Explain why these aspects resonate with you personally and professionally, and how this passion translates to excellence in your work.",
    "category": "Motivation"
  },
  {
    "id": 61,
    "question": "How would you describe your attention to detail?",
    "answer": "Explain your approach to accuracy and thoroughness: specific checking procedures, organizational systems, or quality control methods you use. Provide a brief example demonstrating how your attention to detail prevented problems or improved outcomes.",
    "category": "Work Style"
  },
  {
    "id": 62,
    "question": "Tell me about a time you had to manage multiple stakeholders with different priorities.",
    "answer": "Use the STAR method to describe balancing competing interests from different groups. Focus on your communication, negotiation, and prioritization skills. Explain how you found common ground, managed expectations, and achieved positive results despite complexity.",
    "category": "Interpersonal Skills"
  },
  {
    "id": 63,
    "question": "How do you approach continuous improvement in your work?",
    "answer": "Describe your methodology: regularly seeking feedback, reflecting on processes, staying current with industry developments, setting progressive goals, and implementing incremental enhancements. Provide a brief example of how you've improved a process or outcome over time.",
    "category": "Professional Development"
  },
  {
    "id": 64,
    "question": "What questions do you have for me?",
    "answer": "Prepare thoughtful questions about the role (daily responsibilities, success measures, challenges), team dynamics, company culture, or growth opportunities. Avoid questions about basic information readily available online or compensation at this stage.",
    "category": "Practical"
  },
  {
    "id": 65,
    "question": "How do you stay motivated during routine tasks?",
    "answer": "Describe strategies like focusing on the task's purpose within larger goals, finding efficiency improvements, interspersing routine work with more engaging tasks, setting personal challenges, or recognizing progress. Show your ability to maintain quality even with repetitive responsibilities.",
    "category": "Motivation"
  },
  {
    "id": 66,
    "question": "Tell me about a project where you demonstrated innovation.",
    "answer": "Use the STAR method to describe identifying an opportunity for improvement, developing a creative solution, implementing your idea effectively, and achieving positive results. Highlight your initiative, creative thinking, and the specific impact of your innovation.",
    "category": "Innovation"
  },
  {
    "id": 67,
    "question": "How do you approach building consensus among team members?",
    "answer": "Outline your process: ensuring all perspectives are heard, identifying common ground, focusing on shared goals, addressing concerns transparently, and facilitating collaborative decision-making. Provide a brief example of successfully uniting diverse viewpoints.",
    "category": "Leadership"
  },
  {
    "id": 68,
    "question": "What experience do you have with [specific technical skill/tool mentioned in job description]?",
    "answer": "Describe your level of proficiency honestly, specifying contexts where you've applied the skill, relevant achievements, and continuing education. If your experience is limited, emphasize your transferable skills and demonstrated ability to learn quickly.",
    "category": "Technical Skills"
  },
  {
    "id": 69,
    "question": "How do you manage stakeholder expectations?",
    "answer": "Explain your approach: establishing clear communication channels, setting realistic timelines and deliverables from the start, providing regular updates, addressing concerns promptly, and transparently managing changes. Provide a brief example of successful expectation management.",
    "category": "Communication"
  },
  {
    "id": 70,
    "question": "Describe a situation where you had to make an unpopular decision.",
    "answer": "Use the STAR method to describe making a necessary but challenging choice. Focus on your decision-making process, how you communicated the rationale clearly, managed resulting concerns, and ultimately achieved positive outcomes despite initial resistance.",
    "category": "Leadership"
  },
  {
    "id": 71,
    "question": "How do you approach setting professional goals?",
    "answer": "Outline your methodology: aligning with organizational objectives, ensuring goals are specific and measurable, creating realistic timelines, breaking larger goals into actionable steps, tracking progress regularly, and adjusting as needed. Provide a brief example of a goal you successfully achieved.",
    "category": "Career Goals"
  },
  {
    "id": 72,
    "question": "What do you consider your professional strengths and areas for development?",
    "answer": "Identify 2-3 genuine strengths directly relevant to the position with brief supporting examples. Mention 1-2 areas for growth that wouldn't impede job performance, and describe specific actions you're taking to develop in these areas.",
    "category": "Self-Assessment"
  },
  {
    "id": 73,
    "question": "Tell me about a time you had to resolve a conflict within your team.",
    "answer": "Use the STAR method to describe addressing interpersonal or work-related tension. Focus on your communication, mediation, and problem-solving skills. Emphasize the positive resolution and improved relationships or processes that resulted.",
    "category": "Interpersonal Skills"
  },
  {
    "id": 74,
    "question": "How do you approach mentoring or developing others?",
    "answer": "Describe your methodology: understanding individual needs and goals, sharing knowledge effectively, providing constructive feedback, creating growth opportunities, encouraging independence, and celebrating progress. Provide a brief example of successfully helping someone develop professionally.",
    "category": "Leadership"
  },
  {
    "id": 75,
    "question": "What aspects of your current role do you find most challenging?",
    "answer": "Select challenges that demonstrate growth areas rather than fundamental weaknesses. Describe how you're actively addressing these challenges, skills you're developing as a result, and improvements you've already made. Ensure the challenges aren't central to the role you're applying for.",
    "category": "Self-Assessment"
  },
  {
    "id": 76,
    "question": "How do you approach building productive relationships with difficult colleagues?",
    "answer": "Explain your methodology: focusing on professional respect regardless of personal differences, identifying common goals, communicating clearly, establishing boundaries when necessary, and finding constructive ways to collaborate. Provide a brief example of successfully working with a challenging personality.",
    "category": "Interpersonal Skills"
  },
  {
    "id": 77,
    "question": "Describe your experience with managing change in the workplace.",
    "answer": "Use the STAR method to describe facilitating or adapting to significant workplace transitions. Focus on your change management approach, how you helped others adapt, and the successful implementation or adjustment. Demonstrate resilience and a growth mindset.",
    "category": "Adaptability"
  },
  {
    "id": 78,
    "question": "How do you approach making decisions with incomplete information?",
    "answer": "Describe your methodology: gathering all available data, consulting relevant experts, weighing risks against potential benefits, establishing what minimum information is necessary, making the best judgment with available facts, and remaining flexible as new information emerges.",
    "category": "Problem Solving"
  },
  {
    "id": 79,
    "question": "Tell me about a time you had to persuade someone to accept your idea.",
    "answer": "Use the STAR method to describe effectively influencing a colleague, manager, or stakeholder. Focus on your preparation, understanding of their perspective, compelling communication, addressing of concerns, and the positive outcome achieved through successful persuasion.",
    "category": "Communication"
  },
  {
    "id": 80,
    "question": "What do you believe makes a team successful?",
    "answer": "Identify key elements of effective teamwork: clear shared goals, complementary skills, open communication, mutual accountability, trust, constructive conflict resolution, and recognition of contributions. Provide a brief example from your experience of these principles in action.",
    "category": "Teamwork"
  },
  {
    "id": 81,
    "question": "How do you approach receiving constructive criticism?",
    "answer": "Describe your methodology: listening without defensiveness, asking clarifying questions, reflecting honestly on the feedback, expressing appreciation, developing an improvement plan, and following up to show progress. Provide a brief example of applying feedback effectively.",
    "category": "Professional Development"
  },
  {
    "id": 82,
    "question": "What strategies do you use to maintain productivity?",
    "answer": "Outline specific techniques: prioritization systems, time-blocking, minimizing distractions, regular progress reviews, appropriate delegation, and energy management. Explain how these strategies have enhanced your efficiency and output in previous roles.",
    "category": "Work Style"
  },
  {
    "id": 83,
    "question": "Describe a situation where you had to work with limited resources.",
    "answer": "Use the STAR method to describe accomplishing objectives despite constraints (budget, time, personnel, etc.). Focus on your creativity, prioritization, efficiency, and resourcefulness. Highlight the successful outcome achieved despite limitations.",
    "category": "Problem Solving"
  },
  {
    "id": 84,
    "question": "How do you approach building credibility with new teams or stakeholders?",
    "answer": "Explain your methodology: demonstrating competence through early deliverables, listening before suggesting changes, respecting established processes while adding value, following through on commitments, and building relationships thoughtfully. Provide a brief example of successfully establishing trust.",
    "category": "Interpersonal Skills"
  },
  {
    "id": 85,
    "question": "Tell me about a time you had to advocate for yourself or your team.",
    "answer": "Use the STAR method to describe representing important needs or achievements to management. Focus on your preparation, clear communication, persistence, and professionalism. Highlight the positive outcome achieved through effective advocacy.",
    "category": "Communication"
  },
  {
    "id": 86,
    "question": "How do you evaluate the success of a project?",
    "answer": "Describe your assessment framework: measuring against predefined objectives, gathering stakeholder feedback, evaluating both process efficiency and output quality, analyzing team development, and identifying lessons for future improvement. Provide a brief example of a comprehensive project evaluation.",
    "category": "Work Style"
  },
  {
    "id": 87,
    "question": "What experience do you have with remote or hybrid work environments?",
    "answer": "Describe your experience with virtual collaboration, highlighting specific tools and practices that have helped you remain productive, communicative, and connected with team members while working remotely. Emphasize your self-discipline and ability to manage boundaries effectively.",
    "category": "Work Style"
  }
]
class HRQuestionsListView(APIView):
   
    def get(self, request):
        
        return Response(HR_QUESTIONS)

class StartChatView(APIView):
     
    def get(self, request):
         
        return Response({
            "question": HR_QUESTIONS[0]["question"], 
            "id": HR_QUESTIONS[0]["id"]
        })

class NextQuestionView(APIView):
    
    def post(self, request):
        current_id = request.data.get("current_id")
        user_answer = request.data.get("user_answer")

    
        current_question = next((q for q in HR_QUESTIONS if q["id"] == current_id), None)
        
        if not current_question:
            return Response({"error": "Question not found"}, status=404)
            
        correct_answer = current_question["answer"]
 
        feedback = "Good answer!" if any(keyword.lower() in user_answer.lower() 
                                         for keyword in correct_answer.lower().split() 
                                         if len(keyword) > 4) else f"Suggested: {correct_answer}"

        
        next_index = next((i for i, q in enumerate(HR_QUESTIONS) if q["id"] == current_id), -1)
        
        if next_index != -1 and next_index < len(HR_QUESTIONS) - 1:
            next_question = HR_QUESTIONS[next_index + 1]
            return Response({
                "feedback": feedback,
                "next_question": next_question["question"],
                "id": next_question["id"]
            })
        else:
            return Response({
                "feedback": feedback, 
                "message": "Interview completed! Well done on completing the practice session."
            })

class RandomQuestionView(APIView):
 
    def get(self, request):
        random_question = random.choice(HR_QUESTIONS)
        return Response(random_question)

