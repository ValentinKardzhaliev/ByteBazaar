from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from .models import Computer, Monitor, Keyboard
from PC_shop_backend.common.models import ProductImage

class ProductImageInline(GenericTabularInline):
    model = ProductImage
    extra = 1

@admin.register(Computer)
class ComputerAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'processor', 'graphics', 'memory', 'storage']
    inlines = [ProductImageInline]  # Add the inline for images

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('computer', 'Computer')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)

@admin.register(Monitor)
class MonitorAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'resolution', 'refresh_rate', 'panel_type', 'size']
    inlines = [ProductImageInline]  # Add the inline for images

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('monitor', 'Monitor')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)

@admin.register(Keyboard)
class KeyboardAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'key_switch_type', 'backlight', 'color', 'wireless']
    inlines = [ProductImageInline]  # Add the inline for images

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('keyboard', 'Keyboard')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)
