from rest_framework import serializers

from PC_shop_backend.web.models import Product


class ProductSerializer(serializers.Serializer):
    class Meta:
        model = Product
        fields = ('image', 'name', 'description',)
