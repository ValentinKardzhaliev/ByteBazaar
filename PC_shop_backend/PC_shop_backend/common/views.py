from django.db.models import Q
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse
from rest_framework import status
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



def like_event(request, event_id):
    product = get_object_or_404(Product, id=event_id)
    user = request.user

    existing_like = Like.objects.filter(user=user, product=product).first()

    if existing_like:
        existing_like.delete()
    else:
        new_like_object = Like.objects.create(user=user, product=product)
        new_like_object.save()

    return redirect(request.META.get('HTTP_REFERER', reverse('index')))