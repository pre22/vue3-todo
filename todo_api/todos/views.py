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
        instance = TodoModel.objects.filter(user=self.request.user)
        response = serializers.TodoListSerializer(instance, many=True)
        return Response(response.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        '''Create New Todos'''

        serializer = serializers.AddTodoSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            TodoModel.objects.create(
                user=self.request.user,
                todo=data['todo']
            )
            return Response({'message': 'You have successfully created a todo'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, *args, **kwargs):
        '''Update Todos Status'''

        _id = kwargs.get('id')
        _status = kwargs.get('status')

        if not _id or not _status:
            return Response({'error': 'Kindly pass in both an ID and Status value'}, status=status.HTTP_400_BAD_REQUEST)
        

        try:
            instance = TodoModel.objects.get(user=self.request.user, id=_id)
            instance.status = _status
            instance.save()

            return Response({'error': 'Record updated successfully'}, status=status.HTTP_200_OK)
        except TodoModel.DoesNotExist:
            return Response({'error': 'Record with id does not exist on this account'}, status=status.HTTP_400_BAD_REQUEST)
        
        except TypeError as e:
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)



class DeleleTodoView(APIView):
    '''Delete Todo'''
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, id, *args, **kwargs):

        try:
            instance = TodoModel.objects.get(user=self.request.user, id=id)
            instance.delete()

            return Response({'error': 'Record deleted successfully'}, status=status.HTTP_200_OK)
        except TodoModel.DoesNotExist:
            return Response({'error': 'Record with id does not exist on this account'}, status=status.HTTP_400_BAD_REQUEST)

