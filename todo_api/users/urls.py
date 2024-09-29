from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('login/', views.UserLoginView.as_view()),
    path('register/', views.UserRegistrationView.as_view()),
]