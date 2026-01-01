from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class GenerateResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="professional_resume.pdf"'

        # Professional font choices
        base_font = 'Helvetica'
        bold_font = 'Helvetica-Bold'

        c = canvas.Canvas(response, pagesize=A4)
        width, height = A4
        
        # Professional color scheme - Corporate blue theme
        primary_color = colors.HexColor("#1a4d8f")  # Professional navy blue
        accent_color = colors.HexColor("#2563eb")   # Accent blue
        text_color = colors.HexColor("#1f2937")     # Dark gray for text
        light_gray = colors.HexColor("#6b7280")     # Light gray for secondary text
        divider_color = colors.HexColor("#e5e7eb")  # Subtle divider
        
        # Margins and spacing
        left_margin = 50
        right_margin = width - 50
        top_margin = height - 40
        content_width = right_margin - left_margin

        y = top_margin
        current_page = 1
        max_page = 2

        def draw_header():
            """Enhanced professional header with better spacing"""
            nonlocal y
            
            # Name - Bold and prominent
            c.setFont(bold_font, 22)
            c.setFillColor(primary_color)
            name = data.get("name", "YOUR NAME").upper()
            c.drawCentredString(width / 2, y, name)
            y -= 25
            
            # Title/Position
            c.setFont(base_font, 13)
            c.setFillColor(text_color)
            title = data.get("title", "Professional Title")
            c.drawCentredString(width / 2, y, title)
            y -= 22
            
            # Contact information - Clean single line
            contact_parts = []
            if data.get('email'):
                contact_parts.append(data.get('email'))
            if data.get('phone'):
                contact_parts.append(data.get('phone'))
            if data.get('location'):
                contact_parts.append(data.get('location'))
            if data.get('linkedin'):
                linkedin = data.get('linkedin').replace('https://', '').replace('http://', '')
                contact_parts.append(linkedin)
            
            contact_info = '  •  '.join(contact_parts)
            c.setFont(base_font, 9)
            c.setFillColor(light_gray)
            c.drawCentredString(width / 2, y, contact_info)
            y -= 20
            
            # Professional divider line
            c.setStrokeColor(primary_color)
            c.setLineWidth(2)
            c.line(left_margin, y, right_margin, y)
            y -= 25

        def draw_section_header(title):
            """Professional section headers with underline"""
            nonlocal y
            c.setFont(bold_font, 13)
            c.setFillColor(primary_color)
            c.drawString(left_margin, y, title.upper())
            y -= 8
            
            # Section underline
            c.setStrokeColor(accent_color)
            c.setLineWidth(1.5)
            c.line(left_margin, y, right_margin, y)
            y -= 18
            return y

        def wrap_text(text, max_width, font_name, font_size):
            """Optimized text wrapping"""
            lines = []
            for paragraph in text.split('\n'):
                if not paragraph:
                    lines.append('')
                    continue
                
                words = paragraph.split()
                if not words:
                    lines.append('')
                    continue
                
                current_line = words[0]
                for word in words[1:]:
                    test_line = current_line + " " + word
                    if c.stringWidth(test_line, font_name, font_size) < max_width:
                        current_line = test_line
                    else:
                        lines.append(current_line)
                        current_line = word
                lines.append(current_line)
            return lines

        def draw_paragraph(text, x, y, width, font_name=base_font, font_size=10):
            """Draw multi-line text with proper spacing"""
            nonlocal current_page
            c.setFont(font_name, font_size)
            c.setFillColor(text_color)
            
            lines = wrap_text(text, width, font_name, font_size)
            for line in lines:
                if y < 50:
                    if current_page < max_page:
                        c.showPage()
                        current_page += 1
                        y = height - 50
                        c.setFont(font_name, font_size)
                        c.setFillColor(text_color)
                    else:
                        return -1
                c.drawString(x, y, line)
                y -= font_size + 3
            return y

        def check_page_space(needed_height):
            """Check if enough space on page"""
            nonlocal y, current_page
            if y - needed_height < 50:
                if current_page < max_page:
                    c.showPage()
                    current_page += 1
                    y = height - 50
                    return True
                return False
            return True

        def draw_summary():
            """Professional summary section"""
            nonlocal y
            if not data.get('summary'):
                return True
            
            y = draw_section_header('PROFESSIONAL SUMMARY')
            c.setFont(base_font, 10)
            c.setFillColor(text_color)
            summary_text = data.get('summary', '')
            new_y = draw_paragraph(summary_text, left_margin, y, content_width, base_font, 10)
            if new_y == -1:
                return False
            y = new_y - 15
            return True

        def draw_experience():
            """Enhanced experience section with better formatting"""
            nonlocal y
            if not data.get('experience'):
                return True
            
            y = draw_section_header('PROFESSIONAL EXPERIENCE')
            
            for exp in data.get('experience', []):
                if not check_page_space(60):
                    return False
                
                # Job title and company
                c.setFont(bold_font, 11)
                c.setFillColor(text_color)
                title = exp.get('title', '')
                company = exp.get('company', '')
                c.drawString(left_margin, y, title)
                y -= 14
                
                # Company name with location
                c.setFont(base_font, 10)
                c.setFillColor(primary_color)
                company_line = company
                if exp.get('location'):
                    company_line += f" | {exp.get('location')}"
                c.drawString(left_margin, y, company_line)
                
                # Duration on the right
                if exp.get('duration'):
                    c.setFont(base_font, 10)
                    c.setFillColor(light_gray)
                    duration = exp.get('duration', '')
                    duration_width = c.stringWidth(duration, base_font, 10)
                    c.drawString(right_margin - duration_width, y, duration)
                
                y -= 18
                
                # Achievement bullets
                for point in exp.get('points', []):
                    if not check_page_space(15):
                        return False
                    
                    c.setFont(base_font, 10)
                    c.setFillColor(text_color)
                    c.drawString(left_margin, y, "•")
                    new_y = draw_paragraph(point, left_margin + 18, y, content_width - 18, base_font, 10)
                    if new_y == -1:
                        return False
                    y = new_y - 3
                
                y -= 12
            
            return True

        def draw_projects():
            """Enhanced projects section"""
            nonlocal y
            if not data.get('projects'):
                return True
            
            y = draw_section_header('KEY PROJECTS')
            
            for project in data.get('projects', []):
                if not check_page_space(50):
                    return False
                
                # Project name
                c.setFont(bold_font, 11)
                c.setFillColor(text_color)
                name = project.get('name', '')
                c.drawString(left_margin, y, name)
                y -= 15
                
                # Description
                if project.get("description"):
                    c.setFont(base_font, 10)
                    c.setFillColor(text_color)
                    description = project.get('description')
                    desc_lines = wrap_text(description, content_width, base_font, 10)
                    for line in desc_lines:
                        c.drawString(left_margin, y, line)
                        y -= 13
                
                # Technologies
                technologies = project.get("technologies", '')
                if technologies:
                    c.setFont(bold_font, 9)
                    c.setFillColor(light_gray)
                    tech_label = "Technologies: "
                    c.drawString(left_margin, y, tech_label)
                    
                    c.setFont(base_font, 9)
                    c.setFillColor(text_color)
                    label_width = c.stringWidth(tech_label, bold_font, 9)
                    remaining_width = content_width - label_width
                    tech_lines = wrap_text(technologies, remaining_width, base_font, 9)
                    
                    if tech_lines:
                        c.drawString(left_margin + label_width, y, tech_lines[0])
                        y -= 12
                        for line in tech_lines[1:]:
                            c.drawString(left_margin + label_width, y, line)
                            y -= 12
                
                # Links
                links = []
                if project.get("githubLink"):
                    links.append(f"GitHub: {project.get('githubLink')}")
                if project.get("liveLink"):
                    links.append(f"Live: {project.get('liveLink')}")
                
                if links:
                    c.setFont(base_font, 8)
                    c.setFillColor(accent_color)
                    links_text = " | ".join(links)
                    c.drawString(left_margin, y, links_text)
                    y -= 15
                
                # Project highlights
                points = project.get("points", [])
                if points:
                    for point in points[:3]:  # Limit to 3 points
                        if not point or point.strip() == "":
                            continue
                        if not check_page_space(15):
                            return False
                        
                        c.setFont(base_font, 9)
                        c.setFillColor(text_color)
                        c.drawString(left_margin, y, "•")
                        new_y = draw_paragraph(point, left_margin + 15, y, content_width - 15, base_font, 9)
                        if new_y == -1:
                            return False
                        y = new_y - 2
                
                y -= 15
            
            return True

        def draw_education():
            """Professional education section"""
            nonlocal y
            if not data.get("education"):
                return True
            
            y = draw_section_header("EDUCATION")
            
            for edu in data.get('education', []):
                if not check_page_space(45):
                    return False
                
                # Degree
                c.setFont(bold_font, 11)
                c.setFillColor(text_color)
                degree = edu.get('degree', '')
                c.drawString(left_margin, y, degree)
                
                # Duration on the right
                if edu.get('duration', ''):
                    c.setFont(base_font, 10)
                    c.setFillColor(light_gray)
                    duration = edu.get('duration', '')
                    duration_width = c.stringWidth(duration, base_font, 10)
                    c.drawString(right_margin - duration_width, y, duration)
                
                y -= 14
                
                # Institution and location
                institution = edu.get('institution', '')
                location = edu.get('location', '')
                c.setFont(base_font, 10)
                c.setFillColor(primary_color)
                if location:
                    institution_line = f"{institution} | {location}"
                else:
                    institution_line = institution
                c.drawString(left_margin, y, institution_line)
                y -= 20
            
            return True

        def draw_skills():
            """ATS-optimized skills section"""
            nonlocal y
            if not data.get('skills'):
                return True
            
            y = draw_section_header('TECHNICAL SKILLS')
            
            skills = data.get('skills', {})
            skill_categories = {
                "Languages": skills.get("languages", ""),
                "Frameworks & Libraries": skills.get("librariesFrameworks", ""),
                "Microservices": skills.get("microservices", ""),
                "Tools & Platforms": skills.get("toolsPlatforms", ""),
                "Design Tools": skills.get("designPrototyping", ""),
                "Core Concepts": skills.get("concepts", "")
            }
            
            for category, skills_text in skill_categories.items():
                if not skills_text:
                    continue
                if not check_page_space(20):
                    return False
                
                # Category label
                c.setFont(bold_font, 10)
                c.setFillColor(text_color)
                category_label = f"{category}: "
                c.drawString(left_margin, y, category_label)
                
                # Skills list
                category_width = c.stringWidth(category_label, bold_font, 10)
                c.setFont(base_font, 10)
                c.setFillColor(text_color)
                
                remaining_width = content_width - category_width
                skills_lines = wrap_text(skills_text, remaining_width, base_font, 10)
                
                if skills_lines:
                    c.drawString(left_margin + category_width, y, skills_lines[0])
                    y -= 14
                    for line in skills_lines[1:]:
                        c.drawString(left_margin + category_width, y, line)
                        y -= 14
            
            y -= 5
            return True

        def draw_languages():
            """Languages proficiency section"""
            nonlocal y
            if not data.get('languages'):
                return True
            
            y = draw_section_header('LANGUAGES')
            
            languages = data.get("languages", {})
            lang_parts = []
            for language, proficiency in languages.items():
                lang_parts.append(f"{language} ({proficiency})")
            
            lang_text = " • ".join(lang_parts)
            c.setFont(base_font, 10)
            c.setFillColor(text_color)
            
            lines = wrap_text(lang_text, content_width, base_font, 10)
            if not check_page_space(15 * len(lines)):
                return False
            
            for line in lines:
                c.drawString(left_margin, y, line)
                y -= 15
            
            return True

        # Build the resume
        draw_header()
        
        sections_ok = True
        sections_ok = draw_summary() and sections_ok
        sections_ok = draw_skills() and sections_ok
        sections_ok = draw_experience() and sections_ok
        sections_ok = draw_projects() and sections_ok
        sections_ok = draw_education() and sections_ok
        sections_ok = draw_languages() and sections_ok
        
        c.showPage()
        c.save()
        
        return response