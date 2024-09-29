from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User
from . import serializers
from .models import TodoModel


class TodosView(APIView):
    '''
    Get and Add Todos
    '''
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        '''Return List of todos'''
    
    def post(self, request, *args, **kwargs):
        '''Create New Todos'''

    def put(self, request, *args, **kwargs):
        '''Update Todos Status'''


class DeleleTodoView(APIView):
    '''Delete Todo'''
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):

