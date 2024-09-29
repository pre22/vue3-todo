from django.urls import path
from . import views

app_name = 'todos'

url_patterns = [
    path('login/', views.UserLoginView.as_view()),
    path('register/', views.UserRegistrationView.as_view()),
    path('delete-todo/<str:id>/', views.DeleleTodoView.as_view()),
    path('get-todos/', views.TodosView.as_view()),
    path('add-todos/', views.TodosView.as_view()),
    path('update-todos/', views.TodosView.as_view()),
]