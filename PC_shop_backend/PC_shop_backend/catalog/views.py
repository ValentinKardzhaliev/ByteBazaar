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
        graphics_values = request.query_params.getlist('graphics', [])
        graphics_values = [value.lower() for value in graphics_values]

        processor = request.query_params.get('processor', '').lower()
        memory = request.query_params.get('memory', '').lower()
        storage = request.query_params.get('storage', '').lower()

        # Create a Q object for graphics values
        graphics_condition = Q()
        for graphics_value in graphics_values:
            graphics_condition |= Q(graphics__icontains=graphics_value)

        # Combine all conditions using AND
        conditions = Q()  # Default to an AND condition
        if graphics_condition:
            conditions &= graphics_condition
        if processor:
            conditions &= Q(processor__icontains=processor)
        if memory:
            conditions &= Q(memory__icontains=memory)
        if storage:
            conditions &= Q(storage__icontains=storage)

        # Filter the queryset using the combined conditions
        self.queryset = self.queryset.filter(conditions)

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