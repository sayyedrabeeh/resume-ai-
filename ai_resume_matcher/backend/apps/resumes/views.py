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
        section_color = colors.HexColor('"#333333"')
        
        left_margin =60
        right_margin = width - 60
        top_margin = height-50
        content_width = right_margin-left_margin


        y = top_margin
        current_page =1
        max_page =2




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

            contact_parts =[]
            if data.get('email'):
                contact_parts.append(data.get('email'))
            if data.get('phone'):
                contact_parts.append(data.get('phone'))
            if data.get('location'):
                contact_parts.append(data.get('location'))
            if data.get('linkdin'):
                contact_parts.append(data.get('linkdin'))

            contact_info = ' | '.join(contact_parts)
            c.setFont(base_font,10)
            c.drawCentredString(width/2,y,contact_info)
            y-=25

            c.setStrokeColor(main_color)
            c.setLineWidth(1)
            c.line(left_margin,y,right_margin,y)
            y-=20


        def draw_section_header(title):
            nonlocal y
            c.setFont(bold_font, 12)
            c.setFillColor(section_color)
            c.drawString(left_margin, y, title.upper())
            y -= 5

            c.setStrokeColor(main_color)
            c.setLineWidth(1)
            c.line(left_margin,y,right_margin,y)
            y-=15
            return y 
        
        def wrap_text(text,max_width,font_name,font_size):
            lines = []
            for paragraph in text.split('\n'):
                if not paragraph:
                    lines.append('')
                    continue
                words = paragraph.split()
                if not lines.append(''):
                    continue
                current_line = words[0]
                for word in words[1:]:
                    test_line = current_line + " " + word
                    if c.stringWidth(test_line, font_name, font_size) < max_width:
                        current_line=test_line
                    else:
                        lines.append(current_line)
                        current_line=word
                lines.append(current_line)
            return lines


        def draw_paragraph(text,x,y,width,font_name=base_font,font_size=10):
            nonlocal current_page
            c.setFont(font_name, font_size)
            c.setFillColor(text_color)

            lines = wrap_text(text,width,font_name,font_size)
            orginal_y = y
            for line in lines:
                c.drawString(x, y, line)
                y -= font_size + 2
                if y < 50:
                    if current_page > max_page:
                      c.showPage()
                      current_page+=1
                      y = height - 50
                    else:
                        return -1
            return y
                 
        def check_page_space(needed_height):
            nonlocal y,current_page
            if y - needed_height < 50:
                if current_page < max_page:
                    c.showPage()
                    current_page +=1
                    y = height - 50
                    return True
                else:
                    return False
            else:
                return False
        
        def draw_summery():
            nonlocal y 
            if not data.get('summery'):
                return True
            y = draw_section_header('PROFILE SUMMARY')
            summery_text = data.get('summery','')
            new_y = draw_paragraph(summery_text, left_margin, y, content_width)
            if new_y == -1 :
                return False
            y= new_y-10
            return y 
        
        

        def draw_bullet_points(points):
            nonlocal y
            c.setFont("Helvetica", 10)
            for point in points:
                if y < 50:
                    c.showPage()
                    y = height - 50
                c.setFillColor(text_color)
                c.drawString(margin_x, y, f"- {point}")
                y -= 12
            y -= 5

        def draw_labeled_line(label, value):
            nonlocal y
            c.setFont("Helvetica-Bold", 10)
            c.setFillColor(heading_color)
            c.drawString(margin_x, y, f"{label}: {value}")
            y -= 12

        draw_header()

        if data.get("summary"):
            draw_section_title("Professional Summary")
            draw_paragraph(data["summary"])

        if data.get("skills"):
            draw_section_title("Skills")
            for key, val in data["skills"].items():
                draw_labeled_line(key.replace("_", " ").title(), val)

        if data.get("experience"):
            draw_section_title("Work Experience")
            for exp in data["experience"]:
                role = f"{exp.get('title', '')} at {exp.get('company', '')}"
                draw_labeled_line("Role", role)
                draw_labeled_line("Duration", exp.get("duration", ""))
                draw_labeled_line("Location", exp.get("location", ""))
                draw_bullet_points(exp.get("points", []))

        if data.get("education"):
            draw_section_title("Education")
            for edu in data["education"]:
                degree = f"{edu.get('degree', '')} | {edu.get('institution', '')}"
                draw_labeled_line("Degree", degree)
                draw_labeled_line("Duration", edu.get("duration", ""))
                draw_labeled_line("Location", edu.get("location", ""))

        if data.get("projects"):
            draw_section_title("Projects")
            for proj in data["projects"]:
                draw_labeled_line("Project", proj.get("name", ""))
                draw_labeled_line("Technologies", proj.get("technologies", ""))
                draw_bullet_points(proj.get("points", []))

        c.showPage()
        c.save()
        return response