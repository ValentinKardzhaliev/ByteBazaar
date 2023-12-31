from django.urls import path

from PC_shop_backend.api.views import APIRegisterView, APILoginView, APILogoutView

urlpatterns = [
    path('register/', APIRegisterView.as_view(), name='register'),
    path('login/', APILoginView.as_view(), name='login'),
    path('logout/', APILogoutView.as_view(), name='logout user'),
]