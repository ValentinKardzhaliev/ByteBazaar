from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from .models import Computer, Monitor, Keyboard, Mouse, Laptop
from PC_shop_backend.common.models import ProductImage


class ProductImageInline(GenericTabularInline):
    model = ProductImage
    extra = 1


@admin.register(Computer)
class ComputerAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'processor', 'graphics', 'memory', 'storage']
    inlines = [ProductImageInline]

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('computer', 'Computer')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)


@admin.register(Laptop)
class LaptopAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'processor', 'graphics', 'memory', 'storage', 'screen_size', 'battery_life',
                    'weight']
    inlines = [ProductImageInline]

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('laptop', 'Laptop')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)


@admin.register(Monitor)
class MonitorAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'resolution', 'refresh_rate', 'panel_type', 'size']
    inlines = [ProductImageInline]

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('monitor', 'Monitor')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)


@admin.register(Keyboard)
class KeyboardAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'key_switch_type', 'backlight', 'color', 'wireless']
    inlines = [ProductImageInline]

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('keyboard', 'Keyboard')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)


@admin.register(Mouse)
class MouseAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'dpi', 'tracking_type', 'buttons', 'ergonomic', 'wireless', 'color']
    inlines = [ProductImageInline]  # Add the inline for images

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'type':
            # Limit choices based on the model's type
            return db_field.formfield(choices=[('mouse', 'Mouse')])
        return super().formfield_for_choice_field(db_field, request, **kwargs)
