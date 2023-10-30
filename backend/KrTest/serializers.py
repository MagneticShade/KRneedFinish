from rest_framework import serializers
from KrTest.models import image,user

class ImageSerializer(serializers.ModelSerializer):
    class Meta():
        model=image
        fields=['path']
  
class UserSerializer(serializers.ModelSerializer):

    path=ImageSerializer(source='img',read_only=True)
    # path=serializers.RelatedField(source='img',queryset=image.objects.all())

    class Meta():
        model=user
        fields=['name','middlename','surname','birthdate','path','date']


    
