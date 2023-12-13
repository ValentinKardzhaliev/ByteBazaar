from django.db import models

from PC_shop_backend.common.models import Product


class Computer(Product):
    processor = models.CharField(max_length=50)
    graphics = models.CharField(max_length=50)
    memory = models.CharField(max_length=50)
    storage = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.processor} - {self.memory} - {self.storage}"


class Monitor(Product):
    resolution = models.CharField(max_length=20)
    refresh_rate = models.CharField(max_length=10)
    panel_type = models.CharField(max_length=20)
    size = models.CharField(max_length=5)
    def __str__(self):
        return f"{self.name} - {self.size} - {self.refresh_rate}"