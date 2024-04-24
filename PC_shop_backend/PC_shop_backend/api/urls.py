from django.urls import path

from PC_shop_backend.api.views import APIRegisterView, APILoginView, APILogoutView, ChangePasswordView, ChangeEmailView, \
    ChangePhoneView

urlpatterns = [
    path('register/', APIRegisterView.as_view(), name='register'),
    path('login/', APILoginView.as_view(), name='login'),
    path('logout/', APILogoutView.as_view(), name='logout-user'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('change-email/', ChangeEmailView.as_view(), name='change_email'),
    path('change-phone/', ChangePhoneView.as_view(), name='change_phone'),
]