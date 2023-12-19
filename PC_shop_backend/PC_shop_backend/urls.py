from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('PC_shop_backend.api.urls')),
    path('', include('PC_shop_backend.common.urls')),
    path('api/products/', include('PC_shop_backend.catalog.urls')),
    path('api/cart/', include('PC_shop_backend.cart.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
