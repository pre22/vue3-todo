from rest_framework import serializers


class AddTodoSerializer(serializers.Serializer):
    '''
    Create New Todo
    '''
    todo = serializers.CharField(max_length=200, required=True)
