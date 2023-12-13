from django.contrib import admin

from PC_shop_backend.catalog.models import Computer


@admin.register(Computer)
class ComputerAdmin(admin.ModelAdmin):
    pass