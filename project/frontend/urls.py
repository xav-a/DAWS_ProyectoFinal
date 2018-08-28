from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('recientes/', views.recientes, name='recientes'),
    path('about/', views.about, name='about'),
    path('post/<post_id>/', views.show_post, name='show_post'),
    path('new/post/', views.new_post, name='new_post'),
    path('edit/post/<post_id>', views.edit_post, name='edit_post'),
]
