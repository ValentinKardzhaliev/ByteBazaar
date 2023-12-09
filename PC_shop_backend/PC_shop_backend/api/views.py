from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import views


from PC_shop_backend.api.models import ByteBazaarUserProfile
from PC_shop_backend.api.seralizers import UserModel, CreateUserSerializer


class APIRegisterView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (
        permissions.AllowAny,
    )

    def perform_create(self, serializer):
        user = serializer.save()
        phone = self.request.data.get('phone', None)

        ByteBazaarUserProfile.objects.create(user=user, email=user.email, phone=phone)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class APILoginView(ObtainAuthToken):
    pass


@api_view(['POST',])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_user(request):
    print("Inside logout_user view")  # Add this line for debugging
    if request.method == "POST":
        print("Received POST request")  # Add this line for debugging
        try:
            request.auth.delete()  # Use request.auth to access the token associated with the user
            print("Token deleted successfully")  # Add this line for debugging
            return Response({'message': 'user logged out'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error deleting token: {e}")  # Add this line for debugging
            return Response({'message': 'Error deleting token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("Invalid request method")  # Add this line for debugging
        return Response({'message': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)