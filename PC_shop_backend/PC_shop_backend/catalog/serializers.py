from rest_framework import serializers
from .models import Product, Computer, Monitor, Keyboard

class ProductHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'price']

class ComputerHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computer
        fields = ['processor', 'graphics', 'memory', 'storage']

class MonitorHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitor
        fields = ['resolution', 'refresh_rate', 'panel_type', 'size']

class KeyboardHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyboard
        fields = ['key_switch_type', 'backlight', 'wireless']
