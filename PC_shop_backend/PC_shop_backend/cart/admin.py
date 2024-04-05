from django.contrib import admin

from PC_shop_backend.cart.models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'token', 'cart', 'shipping_fee', 'total_price', 'shipping_address', 'payment_info', 'created_at', 'updated_at', 'status']
    list_filter = ['status', 'created_at', 'updated_at']
    search_fields = ['id', 'user__username', 'token', 'shipping_address', 'payment_info']
    readonly_fields = ['created_at', 'updated_at']

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False
