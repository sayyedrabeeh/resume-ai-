from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class GenerateResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="resume.pdf"'

        base_font = 'Helvetica'
        bold_font = 'Helvetica-Bold'

        c = canvas.Canvas(response, pagesize=A4)
        width, height = A4
        main_color = colors.HexColor("#2E75B5")
        text_color = colors.black
        section_color = colors.HexColor("#333333")
        
        left_margin = 60
        right_margin = width - 60
        top_margin = height - 50
        content_width = right_margin - left_margin

        y = top_margin
        current_page = 1
        max_page = 2

        def draw_header():
            nonlocal y
            c.setFont(bold_font, 18)
            c.setFillColor(main_color)
            c.drawCentredString(width / 2, y, data.get("name", "Your Name").upper())
            y -= 20
            c.setFont(base_font, 12)
            c.setFillColor(text_color)
            c.drawCentredString(width / 2, y, data.get("title", "Your Position"))
            y -= 20

            contact_parts = []
            if data.get('email'):
                contact_parts.append(data.get('email'))
            if data.get('phone'):
                contact_parts.append(data.get('phone'))
            if data.get('location'):
                contact_parts.append(data.get('location'))
            if data.get('linkedin'):  
                contact_parts.append(data.get('linkedin'))

            contact_info = ' | '.join(contact_parts)
            c.setFont(base_font, 10)
            c.drawCentredString(width/2, y, contact_info)
            y -= 25

            c.setStrokeColor(main_color)
            c.setLineWidth(1)
            c.line(left_margin, y, right_margin, y)
            y -= 20

        def draw_section_header(title):
            nonlocal y
            c.setFont(bold_font, 12)
            c.setFillColor(section_color)
            c.drawString(left_margin, y, title.upper())
            y -= 5

            c.setStrokeColor(main_color)
            c.setLineWidth(1)
            c.line(left_margin, y, right_margin, y)
            y -= 15
            return y 
        
        def wrap_text(text, max_width, font_name, font_size):
            """Fixed text wrapping function"""
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
            nonlocal current_page
            c.setFont(font_name, font_size)
            c.setFillColor(text_color)

            lines = wrap_text(text, width, font_name, font_size)
            original_y = y
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
                y -= font_size + 2
            return y
        def check_page_space(needed_height):
            nonlocal y, current_page
            if y - needed_height < 50:
                if current_page < max_page:
                    c.showPage()
                    current_page += 1
                    y = height - 50
                    return True
                else:
                    return False
            return True
        def draw_summary():
            nonlocal y 
            if not data.get('summary'):
                return True
            y = draw_section_header('PROFILE SUMMARY')
            summary_text = data.get('summary', '')
            new_y = draw_paragraph(summary_text, left_margin, y, content_width)
            if new_y == -1:
                return False
            y = new_y - 10
            return True
        def draw_experience():
            nonlocal y 
            if not data.get('experience'):
                return True
            y = draw_section_header('EXPERIENCE')
            for exp in data.get('experience', []):
                if not check_page_space(50):
                    return False
                c.setFont(bold_font, 11)
                c.setFillColor(text_color)
                title = exp.get('title', '')
                company = exp.get('company', '')
                position_text = f"{title} - {company}"
                c.drawString(left_margin, y, position_text)
                if exp.get('duration'):
                    c.setFont(base_font, 10)
                    duration = exp.get('duration', '')
                    duration_width = c.stringWidth(duration, base_font, 10)
                    c.drawString(right_margin - duration_width, y, duration)
                y -= 15
                if exp.get('location'):
                    c.setFont(base_font, 10)
                    c.setFillColor(text_color)
                    c.drawString(left_margin, y, exp.get('location', ''))
                    y -= 15
                for point in exp.get('points', []):
                    if not check_page_space(15):
                        return False
                    c.setFont(base_font, 10)
                    c.setFillColor(text_color)
                    c.drawString(left_margin, y, "•")
                    new_y = draw_paragraph(point, left_margin + 15, y, content_width - 15, base_font, 10)
                    if new_y == -1:
                        return False
                    y = new_y - 5
                y -= 10
            return True
        def draw_projects():
            nonlocal y
            if not data.get('projects'):
                return True
            y = draw_section_header('PROJECTS')
            for project in data.get('projects', []):
                project_start_y = y
                if not check_page_space(50):
                    return False
                c.setFont(bold_font, 11)
                c.setFillColor(section_color)
                name = project.get('name', '')  
                c.drawString(left_margin, y, name)
                name_width = c.stringWidth(name, bold_font, 11)
                y -= 15
                if project.get("description"):
                    c.setFont(base_font, 10)
                    c.setFillColor(text_color)
                    description = project.get('description')
                    desc_lines = wrap_text(description, content_width, base_font, 10)
                    for line in desc_lines:
                        c.drawString(left_margin, y, line)
                        y -= 15
                    y += 5  
                technologies = project.get("technologies", '')
                if technologies:
                    c.setFont(base_font, 10)
                    c.setFillColor(main_color)
                    tech_prefix = "Technologies: "
                    prefix_width = c.stringWidth(tech_prefix, base_font, 10)
                    c.drawString(left_margin, y, tech_prefix)
                    remaining_width = content_width - prefix_width
                    tech_text = technologies
                    tech_lines = wrap_text(tech_text, remaining_width, base_font, 10)
                    if tech_lines:
                        c.drawString(left_margin + prefix_width, y, tech_lines[0])
                        y -= 15
                        for line in tech_lines[1:]:
                            c.drawString(left_margin + prefix_width, y, line)
                            y -= 15
                    else:
                        y -= 15
                links = []
                if project.get("githubLink"): 
                    links.append(f"GitHub: {project.get('githubLink')}")
                if project.get("liveLink"):
                    links.append(f"Demo: {project.get('liveLink')}")
                if links:
                    c.setFont(base_font, 10)
                    c.setFillColor(text_color)
                    if len(links) == 2:
                        github_link = links[0]
                        demo_link = links[1]
                        github_width = c.stringWidth(github_link, base_font, 10)
                        demo_width = c.stringWidth(demo_link, base_font, 10)
                        if github_width + demo_width + 20 <= content_width:
                            c.drawString(left_margin, y, github_link)
                            demo_x = left_margin + github_width + 20
                            c.drawString(demo_x, y, demo_link)
                            y -= 15
                        else:
                            c.drawString(left_margin, y, github_link)
                            y -= 15
                            c.drawString(left_margin, y, demo_link)
                            y -= 15
                    else:
                        c.drawString(left_margin, y, links[0])
                        y -= 15
                c.setStrokeColor(main_color)
                c.setLineWidth(0.5)
                c.line(left_margin, y, right_margin, y)
                y -= 12
                points = project.get("points", [])
                if len(points) > 3:
                    points = points[:3] 
                bullet_indent = 15
                for point in points:
                    if not point or point.strip() == "":
                        continue
                    if not check_page_space(15):
                        return False
                    c.setFont(base_font, 10)
                    c.setFillColor(text_color)
                    c.drawString(left_margin, y, "•")   
                    new_y = draw_paragraph(point, left_margin + bullet_indent, y, content_width - bullet_indent, base_font, 10)
                    if new_y == -1:   
                        return False  
                    y = new_y - 5
                y -= 15
                c.setStrokeColor(colors.lightgrey)
                c.setLineWidth(0.5)
                c.line(left_margin + 40, y, right_margin - 40, y)
                y -= 10
            return True
        def calculate_mini_project_height(project, width):
            height = 0
            height += 15
            if project.get("technologies"):
                tech_lines = wrap_text(f"Tech: {project.get('technologies')}", width, base_font, 9)
                height += len(tech_lines) * 12
            if project.get("description"):
                desc_lines = wrap_text(project.get("description"), width, base_font, 9)
                height += len(desc_lines) * 12
            links = []
            if project.get("githubLink"):
                links.append(f"GitHub: {project.get('githubLink')}")
            if project.get("liveLink"):
                links.append(f"Demo: {project.get('liveLink')}")
            if links:
                links_text = " | ".join(links)
                links_lines = wrap_text(links_text, width, base_font, 8)
                height += len(links_lines) * 10
            return height
        def draw_mini_project(project, x, y, width):
            original_y = y
            c.setFont(bold_font, 10)
            c.setFillColor(section_color)
            name = project.get("name", "")
            c.drawString(x, y, name)
            y -= 15
            technologies = project.get("technologies", "")
            if technologies:
                c.setFont(base_font, 9)
                c.setFillColor(main_color)
                tech_lines = wrap_text(f"Tech: {technologies}", width, base_font, 9)
                for line in tech_lines:
                    c.drawString(x, y, line)
                    y -= 12
            description = project.get("description", "")
            if description:
                c.setFont(base_font, 9)
                c.setFillColor(text_color)
                desc_lines = wrap_text(description, width, base_font, 9)
                for line in desc_lines:
                    c.drawString(x, y, line)
                    y -= 12
            links = []
            if project.get("githubLink"):
                links.append(f"GitHub: {project.get('githubLink')}")
            if project.get("liveLink"):
                links.append(f"Demo: {project.get('liveLink')}")
            if links:
                c.setFont(base_font, 8)
                links_text = " | ".join(links)
                links_lines = wrap_text(links_text, width, base_font, 8)
                for line in links_lines:
                    c.drawString(x, y, line)
                    y -= 10
            return original_y - y
        def draw_mini_projects():
            nonlocal y
            if not data.get("miniProjects"):
                return True 
            y = draw_section_header("MINI PROJECTS")
            mini_projects = data.get("miniProjects", [])
            project_heights = []
            for project in mini_projects:
                height = calculate_mini_project_height(project, content_width / 2 - 10)  
                project_heights.append(height)        
            if len(mini_projects) >= 2:
                col_width = (content_width - 20) / 2    
                i = 0
                while i < len(mini_projects):
                    height1 = project_heights[i] if i < len(project_heights) else 0
                    height2 = project_heights[i+1] if i+1 < len(project_heights) else 0
                    row_height = max(height1, height2)
                    if not check_page_space(row_height):
                        return False
                    row_start_y = y
                    if i < len(mini_projects):
                        draw_mini_project(mini_projects[i], left_margin, row_start_y, col_width)
                    if i+1 < len(mini_projects):
                        draw_mini_project(mini_projects[i+1], left_margin + col_width + 20, row_start_y, col_width)
                    y = row_start_y - row_height - 15
                    i += 2
            else:
                for i, project in enumerate(mini_projects):
                    if not check_page_space(project_heights[i]):
                        return False
                    draw_mini_project(project, left_margin, y, content_width)
                    y -= project_heights[i] + 15
            return True
        def draw_education():
            nonlocal y
            if not data.get("education"):
                return True
            y = draw_section_header("EDUCATION")
            for edu in data.get('education', []):
                if not check_page_space(45):
                    return False
                c.setFont(bold_font, 11)
                c.setFillColor(text_color)
                degree = edu.get('degree', '')
                c.drawString(left_margin, y, degree)
                if edu.get('duration', ''):
                    c.setFont(base_font, 10)
                    duration = edu.get('duration', '')
                    duration_width = c.stringWidth(duration, base_font, 10)
                    c.drawString(right_margin - duration_width, y, duration)
                y -= 15
                institution = edu.get('institution', '')
                c.setFont(base_font, 10)
                c.drawString(left_margin, y, institution)
                y -= 15
                if edu.get('location', ''):
                    c.setFont(base_font, 10)
                    c.drawString(left_margin, y, edu.get('location', ''))
                    y -= 15
                y -= 5
            return True
        def draw_skills():
            nonlocal y
            if not data.get('skills'):
                return True
            y = draw_section_header('SKILLS')
            skills = data.get('skills', {})
            skill_categories = {
                "Languages": skills.get("languages", ""),
                "Libraries & Frameworks": skills.get("librariesFrameworks", ""),
                "Microservices": skills.get("microservices", ""),
                "Tools & Platforms": skills.get("toolsPlatforms", ""),
                "Design & Prototyping": skills.get("designPrototyping", ""),
                "Concepts": skills.get("concepts", "")
            }
            c.setFont(base_font, 10)
            c.setFillColor(text_color)
            for category, skills_text in skill_categories.items():
                if not skills_text:
                    continue
                if not check_page_space(25):
                    return False
                c.setFont(bold_font, 10)
                c.drawString(left_margin, y, f"{category}: ")
                category_width = c.stringWidth(f"{category}: ", bold_font, 10)
                skill_start_x = left_margin + category_width
                remaining_width = content_width - category_width
                c.setFont(base_font, 10)
                skills_lines = wrap_text(skills_text, remaining_width, base_font, 10)
                if skills_lines:
                    c.drawString(skill_start_x, y, skills_lines[0])
                    for line in skills_lines[1:]:
                        y -= 15
                        c.drawString(left_margin, y, line) 
                y -= 20
            y -= 5
            return True
        def draw_languages():
            nonlocal y 
            if not data.get('languages'):
                return True
            y = draw_section_header('LANGUAGES')
            languages = data.get("languages", {})
            lang_parts = []
            for language, proficiency in languages.items():
                lang_parts.append(f"{language} ({proficiency})")
            lang_text = ", ".join(lang_parts)
            c.setFont(base_font, 10)
            c.setFillColor(text_color)
            lines = wrap_text(lang_text, content_width, base_font, 10)
            if not check_page_space(15 * len(lines)):
                return False
            for line in lines:
                c.drawString(left_margin, y, line)
                y -= 15
            return True
        draw_header()
        sections_ok = True
        sections_ok = draw_summary() and sections_ok
        sections_ok = draw_skills() and sections_ok
        sections_ok = draw_experience() and sections_ok
        sections_ok = draw_projects() and sections_ok
        sections_ok = draw_mini_projects() and sections_ok
        sections_ok = draw_education() and sections_ok
        sections_ok = draw_languages() and sections_ok
        c.showPage()
        c.save()
        return response