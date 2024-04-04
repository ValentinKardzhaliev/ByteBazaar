import uuid

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from PC_shop_backend.cart.models import CartItem, Cart, Order
from PC_shop_backend.cart.serializers import CartSerializer, OrderSerializer
from PC_shop_backend.common.models import Product
from PC_shop_backend.common.serializers import ProductSerializer


def get_product_by_id(product_id):
    for model_class in Product.__subclasses__():
        try:
            product = model_class.objects.get(pk=product_id)
            return product
        except model_class.DoesNotExist:
            continue
    return None


def get_or_create_user_cart(request):
    if request.user.is_authenticated:
        user_cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        token = uuid.uuid5(uuid.NAMESPACE_DNS, request.META.get('REMOTE_ADDR'))  # Generate token based on IP address
        user_cart, created = Cart.objects.get_or_create(token=token)
        if created:
            user_cart.token = token
            user_cart.save()
    return user_cart


def handle_cart_item(request, product):
    product_type = product.__class__.__name__.lower()

    user_cart = get_or_create_user_cart(request)

    cart_item, created = CartItem.objects.get_or_create(
        user=request.user if request.user.is_authenticated else None,
        product_type=product_type,
        product_id=product.pk,
        defaults={'quantity': 1}
    )

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    user_cart.items.add(cart_item)
    return cart_item


@api_view(['POST'])
def add_to_cart(request, product_id):
    try:
        product = get_product_by_id(product_id)

        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item = handle_cart_item(request, product)

        response_data = {
            'message': 'You have added a product to the cart successfully',
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except ValueError:
        return Response({'error': 'Invalid UUID format for product_id'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def remove_from_cart(request, product_id):
    try:
        product = get_product_by_id(product_id)

        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item = handle_cart_item(request, product)

        user_cart = get_or_create_user_cart(request)
        user_cart.items.remove(cart_item)
        cart_item.delete()

        response_data = {
            'message': 'You have removed a product from the cart successfully',
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except ValueError:
        return Response({'error': 'Invalid UUID format for product_id'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_cart(request):
    user_cart = get_or_create_user_cart(request)
    cart_serializer = CartSerializer(user_cart)
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


@api_view(['POST'])
def increase_quantity(request, product_id):
    user_cart = get_or_create_user_cart(request)
    cart_item = get_object_or_404(CartItem,
                                  user=request.user if request.user.is_authenticated else None,
                                  product_id=product_id
                                  )
    cart_item.quantity += 1
    cart_item.save()
    return Response({'message': 'Quantity increased successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def decrease_quantity(request, product_id):
    user_cart = get_or_create_user_cart(request)
    cart_item = get_object_or_404(CartItem,
                                  user=request.user if request.user.is_authenticated else None,
                                  product_id=product_id
                                  )

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        cart_item.save()
        return Response({'message': 'Quantity decreased successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Quantity cannot be decreased below 1'}, status=status.HTTP_400_BAD_REQUEST)


class OrderCreateView(APIView):
    def post(self, request):
        cart_id = request.data.get('cart')
        shipping_address = request.data.get('shipping_address')
        payment_info = request.data.get('payment_info')

        try:
            cart = Cart.objects.get(pk=cart_id)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        if cart.user_id:
            user = cart.user_id
            order_data = {
                'user': user,
                'cart': cart_id,
                'shipping_fee': 7.00,
                'shipping_address': shipping_address,
                'payment_info': payment_info
            }
        else:
            token = cart.token
            order_data = {
                'cart': cart_id,
                'token': token,
                'shipping_fee': 7.00,
                'shipping_address': shipping_address,
                'payment_info': payment_info
            }

        serializer = OrderSerializer(data=order_data)
        if serializer.is_valid():
            serializer.save()  # Move this line here
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(APIView):
    def get(self, request, order_id):
        try:
            order = Order.objects.get(pk=order_id)
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
