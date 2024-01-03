from django.urls import path

from PC_shop_backend.common.views import ProductListView, like_product, LikedProductsView

urlpatterns = [
    path('', ProductListView.as_view(), name='index'),
    path('like_product/<int:product_id>/', like_product, name='like product'),
    path('liked_products/', LikedProductsView.as_view(), name='liked products'),
]