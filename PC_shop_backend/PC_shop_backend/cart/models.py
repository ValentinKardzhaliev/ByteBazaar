# catalog/models.py
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.contrib.auth import get_user_model
from PC_shop_backend.common.models import Product

UserModel = get_user_model()

class Cart(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, null=True, blank=True)
    items = models.ManyToManyField('CartItem', related_name='cart_items')

    def __str__(self):
        return f"Cart for {self.user.username if self.user else 'Anonymous User'}"

class CartItem(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    product = GenericForeignKey('content_type', 'object_id')
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Cart"