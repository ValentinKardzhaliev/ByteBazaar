from django.urls import path

from PC_shop_backend.common.views import IndexView, like_product, LikedProductsView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('like_product/<uuid:product_id>/', like_product, name='like_product'),
    path('liked_products/', LikedProductsView.as_view(), name='liked products'),
]