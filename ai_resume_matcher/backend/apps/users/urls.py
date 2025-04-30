from django.urls import path
from .views import SignupView, LoginView,ResumeUploadView,UserProfilesView,CurrentUserProfileView,SetCurrentProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('upload-resume/', ResumeUploadView.as_view(), name='upload-resume'),
    path('profiles/', UserProfilesView.as_view(), name='user-profiles'),   
    path('current-profiles/', CurrentUserProfileView.as_view(), name='current-profiles'),
    path('set-current-profile/', SetCurrentProfileView.as_view(), name='set-current-profile'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
