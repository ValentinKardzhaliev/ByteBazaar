from django.contrib import admin

from PC_shop_backend.cart.models import Order, Cart, CartItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'token']
    list_filter = ['user']
    search_fields = ['user__username']

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product_type', 'product_id', 'quantity']
    list_filter = ['cart', 'product_type']
    search_fields = ['cart__user__username', 'product_type']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'token', 'shipping_fee', 'total_price', 'shipping_address', 'payment_info', 'created_at', 'updated_at', 'status']
    list_filter = ['status', 'created_at', 'updated_at']
    search_fields = ['id', 'user__username', 'token', 'shipping_address', 'payment_info']
    readonly_fields = ['created_at', 'updated_at']

    def payment_info(self, obj):
        return obj.payment_method

    payment_info.short_description = 'Payment Method'
