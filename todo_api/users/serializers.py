from rest_framework import serializers

class UserAuthSerializer(serializers.Serializer):
    '''
    Serializer for Login and Registration
    '''
    email = serializers.EmailField(required=True)
    password = serializers.CharField(max_length=200, required=True)