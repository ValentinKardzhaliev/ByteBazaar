<<<<<<< HEAD
# from rest_framework import serializers
#
# from PC_shop_backend.web.models import Product
#
#
# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ('image', 'name', 'description',)
=======
from rest_framework import serializers

from PC_shop_backend.web.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('image', 'name', 'description',)
>>>>>>> ad5f36463945b2aff07dad0ee57c3469e65196b7
