from django.db import models

from PC_shop_backend.common.models import Product


class Computer(Product):
    processor = models.CharField(max_length=50)
    graphics = models.CharField(max_length=50)
    memory = models.CharField(max_length=50)
    storage = models.CharField(max_length=50)