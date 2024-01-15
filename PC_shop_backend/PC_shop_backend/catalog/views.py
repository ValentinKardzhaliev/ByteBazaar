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
