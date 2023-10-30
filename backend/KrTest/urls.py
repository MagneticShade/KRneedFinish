from django.urls import path
from KrTest import views

urlpatterns=[
    path('test/',views.Users.as_view()),
]