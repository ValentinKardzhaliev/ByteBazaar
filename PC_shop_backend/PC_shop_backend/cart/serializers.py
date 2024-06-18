from decimal import Decimal
from rest_framework import serializers
from .models import Cart, CartItem, Order
from ..common.models import Product


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product_type', 'product_id', 'quantity']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)
    token = serializers.UUIDField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'token']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        cart = Cart.objects.create(**validated_data)
        for item_data in items_data:
            CartItem.objects.create(cart=cart, **item_data)
        return cart

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.save()

        items_data = validated_data.pop('items')
        instance.items.all().delete()
        for item_data in items_data:
            CartItem.objects.create(cart=instance, **item_data)
        return instance


class OrderSerializer(serializers.ModelSerializer):
    cart_items = serializers.PrimaryKeyRelatedField(queryset=CartItem.objects.all(), many=True)
    token = serializers.UUIDField(allow_null=True, required=False)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        cart_items_data = validated_data.pop('cart_items', [])

        total_price = Decimal(0)
        for cart_item in cart_items_data:
            product = None
            for model_class in Product.__subclasses__():
                try:
                    product = model_class.objects.get(pk=cart_item.product_id)
                    break
                except model_class.DoesNotExist:
                    continue

            if product:
                total_price += product.price * cart_item.quantity

        total_price += Decimal(self.context['view'].SHIPPING_FEE)

        order = Order.objects.create(total_price=total_price, **validated_data)

        order.cart_items.set(cart_items_data)

        return order
