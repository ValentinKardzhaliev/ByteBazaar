from django.urls import path

from PC_shop_backend.common.views import IndexView, like_product, LikedProductsView, send_email, get_csrf_token, \
    get_countries

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('like_product/<uuid:product_id>/', like_product, name='like_product'),
    path('liked_products/', LikedProductsView.as_view(), name='liked products'),
    path('send_email/', send_email, name='send_email'),
    path('csrf/', get_csrf_token, name='get_csrf_token'),
    path('get_countries/', get_countries, name='get_countries'),
]