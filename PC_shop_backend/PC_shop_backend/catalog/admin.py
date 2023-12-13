from django.contrib import admin

from PC_shop_backend.catalog.models import Computer, Monitor, Keyboard


@admin.register(Computer)
class ComputerAdmin(admin.ModelAdmin):
    pass

@admin.register(Monitor)
class MonitorAdmin(admin.ModelAdmin):
    pass

@admin.register(Keyboard)
class KeyboardAdmin(admin.ModelAdmin):
    pass