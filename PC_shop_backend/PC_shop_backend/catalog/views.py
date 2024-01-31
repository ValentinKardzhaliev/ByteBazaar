from functools import reduce

from django.db.models import Q, Count
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..common.filters import ProductFilterBackend
from ..common.serializers import ProductSerializer, FilteredProductSerializer
from rest_framework import viewsets
from .models import Computer, Monitor, Keyboard

class ComputerViewSet(viewsets.ModelViewSet):
    queryset = Computer.objects.all()
    serializer_class = FilteredProductSerializer
    filter_backends = [ProductFilterBackend]

    def list(self, request, *args, **kwargs):
        # Handle case-insensitive partial matches for computers (e.g., graphics, processor, memory, storage)
        graphics_values = request.query_params.getlist('graphics', [])
        graphics_values = [value.lower() for value in graphics_values]

        processor = request.query_params.get('processor', '').lower()
        memory = request.query_params.get('memory', '').lower()
        storage = request.query_params.get('storage', '').lower()

        if graphics_values:
            # Use Q objects to create an OR condition for graphics values
            or_condition = reduce(lambda x, y: x | Q(graphics__icontains=y), graphics_values, Q())
            self.queryset = self.queryset.filter(or_condition)

        if processor:
            self.queryset = self.queryset.filter(processor__icontains=processor)
        if memory:
            self.queryset = self.queryset.filter(memory__icontains=memory)
        if storage:
            self.queryset = self.queryset.filter(storage__icontains=storage)

        return super().list(request, *args, **kwargs)

class MonitorViewSet(viewsets.ModelViewSet):
    queryset = Monitor.objects.all()
    serializer_class = FilteredProductSerializer
    filter_backends = [ProductFilterBackend]

class KeyboardViewSet(viewsets.ModelViewSet):
    queryset = Keyboard.objects.all()
    serializer_class = FilteredProductSerializer
    filter_backends = [ProductFilterBackend]

class ProductDetailsView(APIView):
    def get_object(self, product_type, pk):
        model_class = None

        try:
            model_class = {
                'computer': Computer,
                'monitor': Monitor,
                'keyboard': Keyboard,
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