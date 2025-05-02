# urls.py
from .views import GenerateResumeView

urlpatterns = [
    path('generate-resume/', GenerateResumeView.as_view(), name='generate_resume'),
]
