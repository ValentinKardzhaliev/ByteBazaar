from django.apps import apps
from django.db.models import Q, Count
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..common.filters import ProductFilterBackend
from ..common.models import Product
from ..common.serializers import ProductSerializer, FilteredProductSerializer
from rest_framework import viewsets
from .models import Computer, Monitor, Keyboard, Laptop, Mouse, Headphones


class BaseProductViewSet(viewsets.ModelViewSet):
    serializer_class = FilteredProductSerializer
    filter_backends = [ProductFilterBackend]
    model = None

    def get_queryset(self):
        return self.model.objects.all()

    def list(self, request, *args, **kwargs):
        conditions = Q()
        for field in self.model._meta.fields:
            param_value = request.query_params.get(field.name, '').lower()
            if param_value:
                conditions &= Q(**{f"{field.name}__icontains": param_value})

        self.queryset = self.get_queryset().filter(conditions)
        return super().list(request, *args, **kwargs)


class ComputerViewSet(BaseProductViewSet):
    model = Computer


class MonitorViewSet(BaseProductViewSet):
    model = Monitor


class KeyboardViewSet(BaseProductViewSet):
    model = Keyboard


class LaptopViewSet(BaseProductViewSet):
    model = Laptop


class MouseViewSet(BaseProductViewSet):
    model = Mouse


class HeadphonesViewSet(BaseProductViewSet):
    model = Headphones


class ProductDetailsView(APIView):
    def get_object(self, product_type, pk):
        model_class = None

        try:
            model_class = {
                'computer': Computer,
                'monitor': Monitor,
                'keyboard': Keyboard,
                'laptop': Laptop,
                'mouse': Mouse,
                'headphones': Headphones,
            }[product_type]

            obj = model_class.objects.get(pk=pk)
            return obj
        except model_class.DoesNotExist:
            return None

    def get(self, request, product_type, pk, *args, **kwargs):
        product_instance = self.get_object(product_type, pk)

        if not product_instance:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Use the dynamically created fields for the abstract model 'Product'
        serializer = ProductSerializer(product_instance)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GraphicsCountView(APIView):
    def get(self, request, *args, **kwargs):
        graphics_counts = Computer.objects.values('graphics').annotate(count=Count('_id')).order_by('-count')
        return Response(graphics_counts)


class CharacteristicCountView(APIView):
    def get(self, request, product_type, *args, **kwargs):
        valid_subclasses = [model for model in apps.get_models() if issubclass(model, Product)]

        counts = {}
        for subclass in valid_subclasses:
            if not hasattr(subclass, 'type'):
                counts[subclass.__name__] = {
                    "error": f"'type' attribute not found in {subclass.__name__} model."}
                continue

            if subclass.__name__.lower() == product_type.lower():
                characteristics = {}
                product_fields = [field.name for field in Product._meta.get_fields()]
                for field in subclass._meta.get_fields():
                    if field.name not in product_fields:
                        characteristics[field.name] = list(
                            subclass.objects.values(field.name).annotate(count=Count('_id')).order_by('-count'))
                counts[subclass.__name__] = characteristics
                break
        else:
            counts = {"error": f"No subclass matches the product type '{product_type}'."}

        return Response(counts)
