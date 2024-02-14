from django.urls import path
from .views import ComputerViewSet, MonitorViewSet, KeyboardViewSet, ProductDetailsView, GraphicsCountView

computer_list = ComputerViewSet.as_view({'get': 'list'})
monitor_list = MonitorViewSet.as_view({'get': 'list'})
keyboard_list = KeyboardViewSet.as_view({'get': 'list'})

urlpatterns = [
    path('computers/', computer_list, name='computer-list'),
    path('monitors/', monitor_list, name='monitor-list'),
    path('keyboards/', keyboard_list, name='keyboard-list'),
    path('<str:product_type>/<uuid:pk>/', ProductDetailsView.as_view(), name='product-details'),
    path('graphics-count/', GraphicsCountView.as_view(), name='graphics count'),
]

