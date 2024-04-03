from django.contrib import admin

from PC_shop_backend.cart.models import Cart


class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'token']
    list_filter = ['user']
    search_fields = ['user__username']

admin.site.register(Cart, CartAdmin)
