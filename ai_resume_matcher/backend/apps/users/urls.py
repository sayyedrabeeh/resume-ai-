from django.urls import path
from .views import SignupView, LoginView,ResumeUploadView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('upload-resume/', ResumeUploadView.as_view(), name='upload-resume'),

]
