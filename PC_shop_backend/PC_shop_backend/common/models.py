from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

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

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}"

class Like(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    # Using GenericForeignKey to allow association with any product
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    product = GenericForeignKey('content_type', 'object_id')

    liked_at = models.DateTimeField(auto_now_add=True)
