from django.urls import path

from PC_shop_backend.api.views import APIRegisterView, APILoginView, logout_user

urlpatterns = [
    path('register/', APIRegisterView.as_view(), name='register'),
    path('login/', APILoginView.as_view(), name='login'),
    path('logout/', logout_user, name='logout user'),
]