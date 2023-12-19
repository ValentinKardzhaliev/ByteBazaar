# cart/views.py
from rest_framework import generics
from rest_framework.response import Response

from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from ..common.models import Product


class CartView(generics.RetrieveUpdateAPIView):
    serializer_class = CartSerializer

    def get_object(self):
        # Check if the user is authenticated
        if self.request.user.is_authenticated:
            # If authenticated, retrieve the user's cart
            user = self.request.user
            cart, created = Cart.objects.get_or_create(user=user)
        else:
            # If anonymous, use a session ID to identify the cart
            session_id = self.request.session.session_key
            cart, created = Cart.objects.get_or_create(session_id=session_id)

        return cart

    def get_serializer_context(self):
        # Include the user in the serializer context
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

    def get(self, request, *args, **kwargs):
        # Override the get method to include cart items in the response
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

class AddToCartView(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def perform_create(self, serializer):
        # Extract the product ID and model name from the request data
        product_id = self.request.data.get('product_id')
        product_model_name = self.request.data.get('product_model_name')

        # Find the correct concrete model based on the model name
        concrete_model = Product.__subclasses__()[product_model_name]

        try:
            # Retrieve the product using the model and ID
            product = concrete_model.objects.get(id=product_id)
        except concrete_model.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        # Set the user for the cart item based on the request user
        serializer.save(user=self.request.user, product=product)

        return Response({'message': 'Product added to cart'}, status=201)

