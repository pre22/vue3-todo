from rest_framework import serializers
from .models import TodoModel

class AddTodoSerializer(serializers.Serializer):
    '''
    Create New Todo
    '''
    todo = serializers.CharField(max_length=200, required=True)

class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoModel
        exclude = ('user', 'modified_at', 'created_at',)
