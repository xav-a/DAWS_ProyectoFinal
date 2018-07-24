from django.db import models

class Usuario(models.Model):
	name = models.CharField(max_length=100)
	last = models.CharField(max_length=100)
	email = models.EmailField()
	age = models.PositiveSmallIntegerField()
	join_date = models.DateTimeField(auto_now_add=True)
	username = models.CharField(max_length=26)
	password = models.CharField(max_length=30)