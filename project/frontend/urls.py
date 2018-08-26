from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
	path('about/', views.about, name='about'),
	path('admin/user_list/', views.user_list, name='user_list'),
	path('post/<post_id>/', views.show_post, name='show_post'),
	path('new/post/', views.new_post, name='new_post'),
]