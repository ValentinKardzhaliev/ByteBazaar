# from rest_framework import generics
# from .models import Computer, Monitor, Keyboard
# from .serializers import ComputerSerializer, MonitorSerializer, KeyboardSerializer
# from .filters import ComputerFilter, MonitorFilter, KeyboardFilter
#
# class ComputerList(generics.ListAPIView):
#     queryset = Computer.objects.all()
#     serializer_class = ComputerSerializer
#     filter_class = ComputerFilter
#
# class MonitorList(generics.ListAPIView):
#     queryset = Monitor.objects.all()
#     serializer_class = MonitorSerializer
#     filter_class = MonitorFilter
#
# class KeyboardList(generics.ListAPIView):
#     queryset = Keyboard.objects.all()
#     serializer_class = KeyboardSerializer
#     filter_class = KeyboardFilter
