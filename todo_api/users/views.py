from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User
from . import serializers


class UserRegistrationView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):

        serializer = serializers.UserAuthSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            user = User.objects.create(email=data['email'])
            user.set_password(data['password'])
            user.save()
            return Response({'success': 'User Registration Success'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):

        serializer = serializers.UserAuthSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            print(data)
            
            try:
                user = User.objects.get(email=data['email'])
                check = user.check_password(data['password'])
                if check:
                    refresh_token = RefreshToken.for_user(user)
                    access_token = refresh_token.access_token
                    response_data = {
                        'refresh_token': str(refresh_token), 
                        'access_token': str(access_token),
                        'user': user.email
                    }
                    return Response({"message": response_data}, status=status.HTTP_201_CREATED)
                
                elif not check:
                    print('not check')
                    return Response({"error": "email or password incorrect"}, status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:
                return Response({'error': 'New User? Kindly Create a New Account'}, status=status.HTTP_400_BAD_REQUEST)
        print(serializer.errors)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

