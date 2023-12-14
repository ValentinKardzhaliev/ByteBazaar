import django_filters
from .models import Computer, Monitor, Keyboard

class ComputerFilter(django_filters.FilterSet):
    class Meta:
        model = Computer
        fields = ['name', 'processor', 'graphics', 'memory', 'storage']

class MonitorFilter(django_filters.FilterSet):
    class Meta:
        model = Monitor
        fields = ['name', 'resolution', 'refresh_rate', 'panel_type', 'size']

class KeyboardFilter(django_filters.FilterSet):
    class Meta:
        model = Keyboard
        fields = ['name', 'key_switch_type', 'backlight', 'color', 'wireless']
