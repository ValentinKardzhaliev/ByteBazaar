from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from PC_shop_backend.common.models import Like, Product
from PC_shop_backend.common.serializers import ProductSearchSerializer, ProductSerializer


class IndexView(APIView):
    def get(self, request, *args, **kwargs):
        # Deserialize the search form from the request data
        search_form = ProductSearchSerializer(data=request.GET)
        search_form.is_valid()

        # If a search query is provided, filter products
        if search_form.validated_data.get('search_query'):
            search_query = search_form.validated_data['search_query']
            queryset = Product.objects.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )
        else:
            # Get all products
            queryset = Product.objects.all()

        # Serialize the products
        product_serializer = ProductSerializer(queryset, many=True)

        # Include products, search form, and search query in the context
        context = {
            'products': product_serializer.data,
            'search_form': search_form.data,
            'search_query': search_form.validated_data.get('search_query', ''),
        }

        # Additional functionality
        # output = [
        #     {
        #         "image": product['image'],
        #         "name": product['name'],
        #         "description": product['description'],
        #         "_id": product['id'],
        #     }
        #     for product in product_serializer.data
        # ]

        # context['output'] = output

        return Response(context, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    user = request.user

    existing_like = Like.objects.filter(user=user, product=product).first()

    if existing_like:
        existing_like.delete()

        message = 'Product unliked successfully.'
    else:
        new_like_object = Like.objects.create(user=user, product=product)
        new_like_object.save()

        message = 'Product liked successfully.'

    # Serialize the product
    product_serializer = ProductSerializer(product)

    return Response({'message': message, 'product': product_serializer.data}, status=status.HTTP_200_OK)


class LikedProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        liked_products = Product.objects.filter(like__user=request.user)
        product_serializer = ProductSerializer(liked_products, many=True)

        return Response({'liked_products': product_serializer.data})
