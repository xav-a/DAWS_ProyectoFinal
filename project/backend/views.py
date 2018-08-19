from django.template.loader import render_to_string, get_template
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.core.mail import EmailMessage

from django.contrib.auth import login, authenticate, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm

from .models import Usuario
from .forms import SignUpForm, EditProfileForm
from .serializers import UsuarioSerializer

from rest_framework import generics


def signup(request):
	if request.method == 'POST':
		form = SignUpForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			raw_password = form.cleaned_data.get('password1')
			user = authenticate(username=username, password=raw_password)
			login(request, user)
			#Envia el correo
			current_site = get_current_site(request)
			mail_subject = 'Bienvenido al Blog'
			message = render_to_string('email_confirm.html', {
				'user': user,
				'domain': current_site.domain,
			})
			to_email = form.cleaned_data.get('email')
			email = EmailMessage(
				mail_subject, message, to=[to_email]
			)
			email.send()
		return redirect('home')
	else:
		form = SignUpForm()
	return render(request, 'registration/signup.html', {'form': form})

@login_required
def profile(request):
	if request.method == 'POST':
		form = EditProfileForm(data=request.POST, instance=request.user)
		if form.is_valid():
			form.save()
			return redirect('profile')
	else:
		form = EditProfileForm(instance=request.user)
	
	return render(request, 'accounts/profile.html', {'form': form})

@login_required
def change_password(request):
	if request.method == 'POST':
		form = PasswordChangeForm(request.user, request.POST)
		if form.is_valid():
			user = form.save()
			update_session_auth_hash(request, user)  # Importante para que no tenga que loggear de nuevo
			return redirect('change_password')		
	else:
		form = PasswordChangeForm(request.user)
	return render(request, 'accounts/change_password.html', {'form': form})

@method_decorator(login_required, name='dispatch')
class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

#class UsuarioView()