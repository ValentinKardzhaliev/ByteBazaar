from django.urls import path

from PC_shop_backend.cart.views import add_to_cart, get_user_cart, remove_from_cart, increase_quantity, \
    decrease_quantity, OrderCreateView, OrderListView

urlpatterns = [
    path('add/<uuid:product_id>/', add_to_cart, name='add_to_cart'),
    path('remove/<uuid:product_id>/', remove_from_cart, name='remove_from_cart'),
    path('user_cart/', get_user_cart, name='user_cart'),
    path('increase_quantity/<uuid:product_id>/', increase_quantity, name='increase_quantity'),
    path('decrease_quantity/<uuid:product_id>/', decrease_quantity, name='decrease_quantity'),
    path('order/', OrderCreateView.as_view(), name='order-create'),
    path('orders/', OrderListView.as_view(), name='order-list'),
]
