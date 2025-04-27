from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm


class SignupForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username','email','password',]

class LoginForm(forms.ModelForm):
    username = forms.CharField(label='username')
    password = forms.CharField(label='password',widget=forms.PasswordInput)

    