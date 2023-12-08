from django.contrib import admin

from PC_shop_backend.common.models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass
