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