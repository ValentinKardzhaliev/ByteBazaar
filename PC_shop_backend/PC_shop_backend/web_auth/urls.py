from django.urls import path

from PC_shop_backend.web_auth.views import RegisterView, LoginView, DeleteView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(),name='login'),
    # path('delete/', DeleteView.as_view(), name='delete'),
]