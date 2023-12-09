from django.contrib.auth.models import User
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class ByteBazaarUserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(unique=True, null=True, blank=True, default="")

    def __str__(self):
        return f"{self.user.username}'s Profile"

