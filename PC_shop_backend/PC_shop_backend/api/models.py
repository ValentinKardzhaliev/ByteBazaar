from django.contrib.auth.models import User
from django.db import models

class ByteBazaarUserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(
        unique=True,
        null=True,
        blank=True,
    )
