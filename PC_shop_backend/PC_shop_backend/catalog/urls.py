# products/urls.py
from django.urls import path
from .views import ComputerList, MonitorList, KeyboardList

urlpatterns = [
    path('computers/', ComputerList.as_view(), name='computer list'),
    path('monitors/', MonitorList.as_view(), name='monitor list'),
    path('keyboards/', KeyboardList.as_view(), name='keyboard list'),
]