from django.urls import path
from . import views

urlpatterns = [
    path('api/usuarios/', views.UsuarioListCreate.as_view()),
	path('api/users/', views.UserList.as_view()),
]