from django.shortcuts import render
from rest_framework import views as rest_views
from rest_framework.response import Response
from rest_framework import generics as rest_generic_views
from PC_shop_backend.web.models import Product
from PC_shop_backend.web.serializers import ProductSerializer


class IndexView(rest_views.APIView):
    def get(self, request):
        output = [
            {"image": product.image,
             "name": product.name,
             "description": product.description,
             "_id": product.id}
            for product in Product.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
