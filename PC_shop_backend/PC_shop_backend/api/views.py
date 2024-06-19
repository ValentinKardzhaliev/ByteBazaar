from django.contrib.auth import update_session_auth_hash
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as auth_views
from rest_framework.response import Response
from rest_framework import views as api_views

from PC_shop_backend.api.models import ByteBazaarUserProfile
from PC_shop_backend.api.seralizers import UserModel, CreateUserSerializer, PasswordChangeSerializer, \
    EmailChangeSerializer, PhoneChangeSerializer


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
            user=user, phone=phone)

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


class ChangeEmailView(api_views.APIView):
    def post(self, request):
        serializer = EmailChangeSerializer(data=request.data)
        if serializer.is_valid():
            new_email = serializer.validated_data.get("new_email")
            user = request.user

            if UserModel.objects.filter(email=new_email).exists():
                return Response({"detail": "Email is already in use."}, status=status.HTTP_400_BAD_REQUEST)

            user.email = new_email
            user.save()
            return Response({"detail": "Email updated successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePhoneView(api_views.APIView):
    def post(self, request):
        serializer = PhoneChangeSerializer(data=request.data)
        if serializer.is_valid():
            new_phone = serializer.validated_data.get("new_phone")
            user = request.user
            try:
                user_profile = user.bytebazaaruserprofile
            except ObjectDoesNotExist:
                return Response({"detail": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

            user_profile.phone = new_phone
            user_profile.save()
            return Response({"detail": "Phone number updated successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

