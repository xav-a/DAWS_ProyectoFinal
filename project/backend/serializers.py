from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('name', 'last', 'email', 'age', 'join_date', 'username')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id', 'first_name', 'last_name')
        read_only_fields = ('id', 'username',)