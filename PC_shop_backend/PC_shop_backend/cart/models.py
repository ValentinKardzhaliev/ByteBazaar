from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import User
import uuid
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField

from PC_shop_backend.api.seralizers import UserModel
from PC_shop_backend.common.models import Product


class CartItem(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True, blank=True)
    product_type = models.CharField(max_length=20)
    product_id = models.UUIDField()
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        if self.user:
            return f"{self.quantity} x {self.product_type} for {self.user.username}"
        else:
            return f"{self.quantity} x {self.product_type} (Anonymous)"


class Cart(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, null=True, blank=True)
    token = models.UUIDField(default=uuid.uuid4, editable=False, null=True)  # Token for anonymous users
    items = models.ManyToManyField(CartItem)

    def __str__(self):
        if self.user:
            return f"Cart for {self.user.username}"
        else:
            return "Anonymous Cart"


class Order(models.Model):
    post_code_validator = RegexValidator(regex=r'^[A-Za-z0-9 ]+$', message='Enter a valid postal code.')

    PAYMENT_CHOICES = [
        ('CREDIT', 'Credit Card'),
        ('PAYPAL', 'PayPal'),
        ('BANK_TRANSFER', 'Bank Transfer'),
        ('CASH', 'Cash'),
        ('DEBIT', 'Debit Card'),
    ]
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Canceled', 'Canceled'),
    )

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True, blank=True)
    token = models.UUIDField(editable=False, null=True, blank=True)
    shipping_fee = models.DecimalField(max_digits=6, decimal_places=2, default=7.00)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    phone = PhoneNumberField(null=True, blank=True, default="")
    country = CountryField(blank_label='(select country)')
    city = models.CharField(max_length=100)
    shipping_address = models.TextField()
    payment_method = models.CharField(
        max_length=14,
        choices=PAYMENT_CHOICES,
        default='CREDIT',
    )
    email = models.EmailField(null=True, blank=True)
    post_code = models.CharField(max_length=20, validators=[post_code_validator])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def save(self, cart_items=None, *args, **kwargs):
        total_price = 0
        if not self.pk and cart_items:
            for cart_item in cart_items:
                product = None
                for model_class in Product.__subclasses__():
                    try:
                        product = model_class.objects.get(pk=cart_item.product_id)
                        break
                    except model_class.DoesNotExist:
                        continue

                if product:
                    total_price += product.price * cart_item.quantity

            total_price += self.shipping_fee

        self.total_price = total_price

        if not self.pk:
            self.status = 'Pending'

        super().save(*args, **kwargs)

    def __str__(self):
        if self.user:
            return f"Order #{self.id} - {self.user.username}"
        else:
            return f"Order #{self.id} - Anonymous User"
