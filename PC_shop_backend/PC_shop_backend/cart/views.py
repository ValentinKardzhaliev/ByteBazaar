from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from PC_shop_backend.cart.models import CartItem, Cart
from PC_shop_backend.cart.serializers import CartSerializer
from PC_shop_backend.common.models import Product
from PC_shop_backend.common.serializers import ProductSerializer


@api_view(['POST'])
def add_to_cart(request, product_id):
    try:
        # Assuming product_id is a valid UUID string
        product = None

        # Iterate through concrete models to find the correct one
        for model_class in Product.__subclasses__():
            try:
                product = model_class.objects.get(pk=product_id)
                break  # Exit the loop if a valid product instance is found
            except model_class.DoesNotExist:
                continue

        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Determine the product type dynamically
        product_type = product.__class__.__name__.lower()

        # Get or create a cart for the user
        user_cart, created = Cart.objects.get_or_create(user=request.user)

        # Create or update CartItem
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product_type=product_type,
            product_id=product._id,
            defaults={'quantity': 1}
        )

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        # Update the user's cart
        user_cart.items.add(cart_item)

        # Serialize the product instance
        product_serializer = ProductSerializer(product)

        # Serialize the cart
        cart_serializer = CartSerializer(user_cart)

        response_data = {
            'product': product_serializer.data,
            'cart': cart_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except ValueError:
        return Response({'error': 'Invalid UUID format for product_id'}, status=status.HTTP_400_BAD_REQUEST)
