from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from KrTest.models import user,image
from KrTest.serializers import UserSerializer

from rest_framework.parsers import JSONParser
import json

class Users(APIView):

    def get(self,request):
        users=user.objects.all()
        serialized=UserSerializer(users,many=True)
        return Response(serialized.data)

    def post(self,request):
        print(request.data)

        images=request.data["path"]
        image.objects.create(path=images)
        id=image.objects.latest('id')

        users=UserSerializer(data=request.data)
        users.is_valid(raise_exception=True)
        users.save(img=id)
        
        return Response(users.data)