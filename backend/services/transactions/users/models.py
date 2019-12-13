from django.db import models
from django.contrib.auth.models import AbstractUser
from users.managers import UserManager


class UserModel(AbstractUser):
    objects = UserManager()
    name = models.CharField(max_length=160, blank=True, null=True)
    email = models.CharField(max_length=250, unique=True, null=True)
    username = models.CharField(max_length=160, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'password']

    class Meta:
        db_table = "users"
