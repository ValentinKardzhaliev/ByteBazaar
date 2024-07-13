from django.db.models import Q
from rest_framework import serializers

from .models import Product, ProductImage, Like
from ..catalog.models import Computer, Monitor, Keyboard, Laptop, Headphones, Mouse
from ..catalog.serializers import ComputerSerializer, MonitorSerializer, KeyboardSerializer, LaptopSerializer, \
    MouseSerializer, HeadphonesSerializer


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('image',)


class ProductSerializer(serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super(ProductSerializer, self).__init__(*args, **kwargs)

        # Get the fields from the abstract model 'Product'
        product_fields = [field.name for field in Product._meta.get_fields()]

        # Add fields from the abstract model to the serializer
        for field_name in product_fields:
            self.fields[field_name] = serializers.CharField()

        # Get all concrete subclasses of 'Product' dynamically
        concrete_models = Product.__subclasses__()

        # Add fields from each concrete model to the serializer dynamically
        for model in concrete_models:
            concrete_fields = [field.name for field in model._meta.get_fields() if field.name not in product_fields]
            for field_name in concrete_fields:
                self.fields[field_name] = serializers.CharField(required=False)

    def to_representation(self, instance):
        # Mapping of models to their respective serializers
        model_serializer_map = {
            Computer: ComputerSerializer,
            Laptop: LaptopSerializer,
            Monitor: MonitorSerializer,
            Keyboard: KeyboardSerializer,
            Mouse: MouseSerializer,
            Headphones: HeadphonesSerializer,
        }

        # Get the serializer class for the instance type
        serializer_class = model_serializer_map.get(type(instance), None)

        if serializer_class:
            # Instantiate the serializer with the instance
            serializer = serializer_class(instance)
            representation = serializer.data
        else:
            # Use the default representation if no specific serializer is found
            representation = super().to_representation(instance)

        # Convert the images to their representations
        images_representation = ProductImageSerializer(instance.images.all(), many=True).data

        # Add images to the representation
        representation['images'] = images_representation

        return representation


class FilteredProductSerializer(ProductSerializer):
    min_price = serializers.DecimalField(required=False, allow_null=True, max_digits=10, decimal_places=2)
    max_price = serializers.DecimalField(required=False, allow_null=True, max_digits=10, decimal_places=2)


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


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
