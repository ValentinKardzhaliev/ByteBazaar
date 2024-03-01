from django.db import models
from django.contrib.auth.models import User

from PC_shop_backend.api.seralizers import UserModel


class CartItem(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    product_type = models.CharField(max_length=20)  # Type of product, e.g., 'computer', 'monitor', 'keyboard'
    product_id = models.UUIDField()  # ID of the specific product
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product_type} for {self.user.username}"


class Cart(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    items = models.ManyToManyField(CartItem)

    def __str__(self):
        return f"Cart for {self.user.username}"
