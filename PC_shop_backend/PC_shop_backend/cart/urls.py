from django.urls import path
from .views import CartView, AddToCartView

urlpatterns = [
    path('<int:pk>/', CartView.as_view(), name='cart-detail'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
]