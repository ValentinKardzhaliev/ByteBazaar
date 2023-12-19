from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Computer, Monitor, Keyboard
from .serializers import ComputerSerializer, MonitorSerializer, KeyboardSerializer
from .filters import ComputerFilter, MonitorFilter, KeyboardFilter
from ..common.serializers import ProductSerializer


class ComputerList(generics.ListAPIView):
    queryset = Computer.objects.all()
    serializer_class = ComputerSerializer
    filter_class = ComputerFilter


class MonitorList(generics.ListAPIView):
    queryset = Monitor.objects.all()
    serializer_class = MonitorSerializer
    filter_class = MonitorFilter


class KeyboardList(generics.ListAPIView):
    queryset = Keyboard.objects.all()
    serializer_class = KeyboardSerializer
    filter_class = KeyboardFilter


class ProductDetailsView(APIView):
    def get_object(self, product_type, pk):
        model_class = None

        try:
            model_class = {
                'computer': Computer,
                'monitor': Monitor,
                'keyboard': Keyboard,
                # Add more types as needed
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
