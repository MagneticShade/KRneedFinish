from django.db import models

class image(models.Model):
    path=models.FileField()

class user(models.Model):
    name=models.CharField(max_length=50)
    middlename=models.CharField(max_length=50,blank=True,null=True)
    surname=models.CharField(max_length=50)
    birthdate=models.DateField()
    img=models.ForeignKey(image,related_name='img_path',on_delete=models.CASCADE)
    date=models.DateTimeField(auto_now_add=True)

