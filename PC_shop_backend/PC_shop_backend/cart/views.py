import uuid
from rest_framework import generics
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from ..common.models import Product

class CartView(generics.RetrieveUpdateAPIView):
    serializer_class = CartSerializer

    def get_object(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            cart, created = Cart.objects.get_or_create(user=user)
        else:
            session_id = self.request.session.get('cart_session_id')
            if not session_id:
                session_id = uuid.uuid4().int >> 64
                self.request.session['cart_session_id'] = str(session_id)

            # Use the 'id' field for get_or_create
            cart, created = Cart.objects.get_or_create(id=session_id)

        return cart

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

    def get(self, request, *args, **kwargs):
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

class AddToCartView(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def perform_create(self, serializer):
        product_id = self.request.data.get('product_id')
        product_model_name = self.request.data.get('product_model_name')
        concrete_model = Product.__subclasses__()[product_model_name]

        try:
            product = concrete_model.objects.get(id=product_id)
        except concrete_model.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        if self.request.user.is_authenticated:
            # For authenticated users, use the user field
            serializer.save(user=self.request.user, product=product)
        else:
            # For anonymous users, use the session_id
            session_id = self.request.session.get('cart_session_id')
            if not session_id:
                session_id = uuid.uuid4().int >> 64
                self.request.session['cart_session_id'] = str(session_id)

            # Save the cart item with the session_id
            serializer.save(session_id=session_id, product=product)

        return Response({'message': 'Product added to cart'}, status=201)