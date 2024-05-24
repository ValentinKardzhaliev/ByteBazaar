import json
import smtplib
from email.mime.text import MIMEText
from django_countries import countries

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
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

        context = {
            'products': product_serializer.data,
            'search_form': search_form.data,
            'search_query': search_form.validated_data.get('search_query', ''),
        }

        return Response(context)


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

    existing_like = Like.objects.filter(
        user=user_instance,
        content_type=content_type,
        product_id=product_instance.pk
    ).first()

    if existing_like:
        existing_like.delete()
        return Response({"detail": "Product unliked successfully."}, status=status.HTTP_200_OK)
    else:
        Like.objects.create(
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
            liked_products.extend(concrete_model.objects.filter(_id__in=liked_products_ids))

        # Serialize the liked products
        product_serializer = ProductSerializer(liked_products, many=True)

        return Response({'liked_products': product_serializer.data})


@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return JsonResponse({'success': False, 'message': 'Name, email, and message are required fields'})

        recipients = ['valentinkardzhaliev@gmail.com', 'simitchievbogomil@gmail.com', 'iordan.paunov@abv.bg']
        subject = f"Message from {name}"
        email_message = f"Sender's Name: {name}\nSender's Email: {email}\n\nMessage:\n{message}"

        try:
            msg = MIMEText(email_message)
            msg["Subject"] = subject
            msg["From"] = settings.GMAIL_USERNAME
            msg["To"] = ', '.join(recipients)

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
                smtp_server.login(settings.GMAIL_USERNAME, settings.GMAIL_APP_PASSWORD)
                smtp_server.sendmail(settings.GMAIL_USERNAME, recipients, msg.as_string())

            return JsonResponse({'success': True, 'message': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})

    return JsonResponse({'success': False, 'message': 'Invalid request method'})


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})



def get_countries(request):
    country_list = [{'code': code, 'name': name} for code, name in list(countries)]
    return JsonResponse({'countries': country_list})