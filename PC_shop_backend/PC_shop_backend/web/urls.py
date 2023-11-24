from django.urls import path

from PC_shop_backend.web.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index')
]