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
        product = None

        for model_class in Product.__subclasses__():
            try:
                product = model_class.objects.get(pk=product_id)
                break
            except model_class.DoesNotExist:
                continue

        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        product_type = product.__class__.__name__.lower()

        user_cart, created = Cart.objects.get_or_create(user=request.user)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product_type=product_type,
            product_id=product._id,
            defaults={'quantity': 1}
        )

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        user_cart.items.add(cart_item)

        cart_serializer = CartSerializer(user_cart)

        response_data = {
            'message': 'You have added a product to the cart successfully',
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except ValueError:
        return Response({'error': 'Invalid UUID format for product_id'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_cart(request):
    # Retrieve the current user's cart
    user_cart, created = Cart.objects.get_or_create(user=request.user)

    # Serialize the cart data
    cart_serializer = CartSerializer(user_cart)

    # Serialize product details for each item in the cart
    cart_data = cart_serializer.data
    product = None
    for item_data in cart_data.get('items', []):
        product_id = item_data.get('product_id')
        if product_id:
            for model_class in Product.__subclasses__():
                try:
                    product = model_class.objects.get(pk=product_id)
                    break
                except model_class.DoesNotExist:
                    continue
            if product:
                product_serializer = ProductSerializer(product)
                item_data['product'] = product_serializer.data

    return Response(cart_data, status=status.HTTP_200_OK)
