from django.shortcuts import render
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework import generics

class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

#class UsuarioView()