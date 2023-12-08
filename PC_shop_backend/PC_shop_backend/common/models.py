from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models



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

    description = models.TextField()

class Like(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} is interested in {self.product.name}"