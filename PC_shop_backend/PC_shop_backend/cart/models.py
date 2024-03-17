from django.db import models
from django.contrib.auth.models import User
import uuid

from PC_shop_backend.api.seralizers import UserModel

class CartItem(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True, blank=True)
    product_type = models.CharField(max_length=20)
    product_id = models.UUIDField()
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        if self.user:
            return f"{self.quantity} x {self.product_type} for {self.user.username}"
        else:
            return f"{self.quantity} x {self.product_type} (Anonymous)"

class Cart(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, null=True, blank=True)
    token = models.UUIDField(default=uuid.uuid4, editable=False, null=True)  # Token for anonymous users
    items = models.ManyToManyField(CartItem)

    def __str__(self):
        if self.user:
            return f"Cart for {self.user.username}"
        else:
            return "Anonymous Cart"
