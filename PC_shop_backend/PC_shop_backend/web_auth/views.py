from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from rest_framework import generics as rest_generic_views

from PC_shop_backend.web_auth.models import WebProfile
from PC_shop_backend.web_auth.seralizer import CreateProfileSerializer


class RegisterView(rest_generic_views.CreateAPIView):
    queryset = WebProfile.objects.all()
    serializer_class = CreateProfileSerializer


class MyLoginView(LoginView):
    template_name = 'registration/login.html'
    redirect_authenticated_user = True

    def get_success_url(self):
        return reverse_lazy('index')

    def form_invalid(self, form):
        messages.error(self.request, 'Invalid username or password')
        return self.render_to_response(self.get_context_data(form=form))


class DeleteView(rest_generic_views.DestroyAPIView):
    pass
