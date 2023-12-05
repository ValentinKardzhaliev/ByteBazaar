from django.urls import path

from PC_shop_backend.web_auth.views import RegisterView, LoginView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(), name='delete'),
]