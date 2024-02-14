import logging

from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
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

        # Initialize an empty queryset
        queryset = []

        # If a search query is provided, filter products
        if search_form.validated_data.get('search_query'):
            search_query = search_form.validated_data['search_query']
            concrete_models = Product.__subclasses__()
            for concrete_model in concrete_models:
                queryset.extend(
                    concrete_model.objects.filter(
                        Q(name__icontains=search_query) | Q(description__icontains=search_query)
                    )
                )
        else:
            # Get all products, including subclasses
            concrete_models = Product.__subclasses__()
            for concrete_model in concrete_models:
                queryset.extend(concrete_model.objects.all())

        # Serialize the products with the updated serializer
        product_serializer = ProductSerializer(queryset, many=True, context={'request': request})

        # Include products, search form, and search query in the context
        context = {
            'products': product_serializer.data,
            'search_form': search_form.data,
            'search_query': search_form.validated_data.get('search_query', ''),
        }

        return Response(context)


logger = logging.getLogger('django.db.backends')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_product(request, product_id):
    product_models = Product.__subclasses__()

    for model in product_models:
        try:
            product_instance = model.objects.get(pk=product_id)
            break
        except model.DoesNotExist:
            continue
    else:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    user_instance = request.user

    content_type = ContentType.objects.get_for_model(product_instance)

    has_liked = Like.objects.filter(
        user=user_instance,
        content_type=content_type,
        product_id=product_instance.pk
    ).exists()

    if has_liked:
        return Response({"detail": "You have already liked this product."}, status=status.HTTP_400_BAD_REQUEST)

    like_instance = Like.objects.create(
        user=user_instance,
        content_type=content_type,
        product_id=product_instance.pk
    )

    return Response({"detail": "Product liked successfully."}, status=status.HTTP_201_CREATED)


class LikedProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        liked_products_ids = Like.objects.filter(user=request.user).values_list('product_id', flat=True)

        # Get all products, including subclasses
        concrete_models = Product.__subclasses__()
        liked_products = []
        for concrete_model in concrete_models:
            liked_products.extend(concrete_model.objects.filter(id__in=liked_products_ids))

        # Serialize the liked products
        product_serializer = ProductSerializer(liked_products, many=True)

        return Response({'liked_products': product_serializer.data})
