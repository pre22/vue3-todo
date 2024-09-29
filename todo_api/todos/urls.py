from django.urls import path
from . import views

app_name = 'todos'

urlpatterns = [
    path('delete-todo/<str:id>/', views.DeleleTodoView.as_view()),
    path('get-todos/', views.TodosView.as_view()),
    path('add-todos/', views.TodosView.as_view()),
    path('update-todos/<str:id>/<str:status>/', views.TodosView.as_view()),
]