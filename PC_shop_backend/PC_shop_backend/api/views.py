from django.contrib.auth import update_session_auth_hash
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as auth_views
from rest_framework.response import Response
from rest_framework import views as api_views

from PC_shop_backend.api.models import ByteBazaarUserProfile
from PC_shop_backend.api.seralizers import UserModel, CreateUserSerializer, PasswordChangeSerializer


class APIRegisterView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (
        permissions.AllowAny,
    )

    def perform_create(self, serializer):
        user = serializer.save()
        phone = self.request.data.get('phone', None)

        ByteBazaarUserProfile.objects.create(
            user=user, email=user.email, phone=phone)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class APILoginView(auth_views.ObtainAuthToken):
    permission_classes = (
        permissions.AllowAny,
    )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
        })

class APILogoutView(api_views.APIView):
    permission_classes = (
            permissions.IsAuthenticated,
        )

    @staticmethod
    def __perform_logout(request):
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({
            'message': 'User logged out',
        })

    def get(self, request):
        return self.__perform_logout(request)

    def post(self, request):
        return self.__perform_logout(request)

class ChangePasswordView(api_views.APIView):
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            old_password = serializer.validated_data.get("old_password")
            new_password = serializer.validated_data.get("new_password")

            if not user.check_password(old_password):
                return Response({"detail": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)