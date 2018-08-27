from django.shortcuts import render, redirect
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render(request, 'frontend/index.html')

def about(request):
	return render(request, 'frontend/about.html')

@staff_member_required
def user_list(request):
	return render(request, 'frontend/user_list.html')

@login_required
def show_post(request, post_id):
	return render(request, 'frontend/show_post.html', {'post_id':post_id})

@login_required
def new_post(request):
	return render(request, 'frontend/new_post.html')
	
@login_required
def edit_post(request, post_id):
	return render(request, 'frontend/edit_post.html', {'post_id':post_id})