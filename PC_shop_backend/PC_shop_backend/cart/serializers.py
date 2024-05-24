from rest_framework import serializers
from .models import Cart, CartItem, Order


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product_type', 'product_id', 'quantity']


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
    token = serializers.UUIDField(allow_null=True, required=False)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        cart_items = validated_data.pop('cart_items')
        order = Order.objects.create(**validated_data)


        return order
