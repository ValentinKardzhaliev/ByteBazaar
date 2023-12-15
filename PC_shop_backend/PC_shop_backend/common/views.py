from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from PC_shop_backend.catalog.models import Computer, Keyboard, Monitor
from PC_shop_backend.catalog.serializers import ComputerHomeSerializer, MonitorHomeSerializer, KeyboardHomeSerializer, \
    ProductHomeSerializer
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

        # Serialize the products dynamically
        serialized_data = []
        for product_data in queryset:
            # Use the ProductHomeSerializer to get common fields
            product_serializer = ProductHomeSerializer(product_data)
            product_data_serialized = product_serializer.data

            # Determine the specific serializer based on the model
            model_serializer_mapping = {
                Computer: ComputerHomeSerializer,
                Monitor: MonitorHomeSerializer,
                Keyboard: KeyboardHomeSerializer,
            }

            for product_data in queryset:
            # Check if the product has related instances of Computer, Monitor, or Keyboard
                if hasattr(product_data, 'computer'):
                    model_class = Computer
                elif hasattr(product_data, 'monitor'):
                    model_class = Monitor
                elif hasattr(product_data, 'keyboard'):
                    model_class = Keyboard
                else:
                    model_class = Product

                specific_serializer_class = model_serializer_mapping.get(model_class)
                specific_serializer = specific_serializer_class(product_data)

                # Add specific serializer data to the common fields
                product_data_serialized.update(specific_serializer.data)

                # Append the combined data to the serialized_data list
                serialized_data.append(product_data_serialized)

        # Include products, search form, and search query in the context
        context = {
            'products': serialized_data,
            'search_form': search_form.data,
            'search_query': search_form.validated_data.get('search_query', ''),
        }

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
