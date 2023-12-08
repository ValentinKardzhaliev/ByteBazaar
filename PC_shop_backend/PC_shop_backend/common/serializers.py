from django.db.models import Q
from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'description']


class ProductSearchSerializer(serializers.Serializer):
    search_query = serializers.CharField(
        max_length=200,
        required=True,
        help_text='Search for a product by name or description...',
    )

    def search_products(self):
        search_query = self.validated_data['search_query']

        # Perform the search in both the name and description fields
        queryset = Product.objects.filter(
            Q(name__icontains=search_query) | Q(description__icontains=search_query)
        )

        # Serialize the queryset using ProductSerializer
        serializer = ProductSerializer(queryset, many=True)
        return serializer.data

