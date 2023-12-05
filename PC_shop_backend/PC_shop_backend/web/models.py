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