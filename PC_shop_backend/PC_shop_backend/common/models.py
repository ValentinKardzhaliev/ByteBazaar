import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

UserModel = get_user_model()

class Product(models.Model):
    PRODUCT_TYPES = [
        ('computer', 'Computer'),
        ('laptop', 'Laptop'),
        ('monitor', 'Monitor'),
        ('keyboard', 'Keyboard'),
        ('mouse', 'Mouse'),
        ('headphones', 'Headphones'),
    ]

    NAME_MAX_LEN = 50

    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=20, choices=PRODUCT_TYPES)
    name = models.CharField(max_length=NAME_MAX_LEN)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    images = GenericRelation('common.ProductImage')
    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}"


class ProductImage(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')

    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.content_object.name}"


class Like(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    product_id = models.UUIDField()
    product = GenericForeignKey('content_type', 'product_id')
    liked_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ['user', 'content_type', 'product_id']