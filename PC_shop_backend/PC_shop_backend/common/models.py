from django.contrib.auth import get_user_model
from django.contrib.auth.models import User



UserModel = get_user_model()

from django.db import models


class Product(models.Model):
    NAME_MAX_LEN = 50

    name = models.CharField(
        max_length=NAME_MAX_LEN
    )

    image = models.ImageField(
        upload_to='product_images/'
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)

    description = models.TextField()

class Like(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)
