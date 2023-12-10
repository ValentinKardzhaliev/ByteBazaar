from django.urls import path

from PC_shop_backend.api.views import APIRegisterView, LoginView, LogoutView

urlpatterns = [
    path('register/', APIRegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout user'),
]