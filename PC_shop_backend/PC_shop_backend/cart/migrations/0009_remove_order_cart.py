# Generated by Django 4.2.7 on 2024-05-24 19:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0008_remove_order_payment_info_order_city_order_country_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='cart',
        ),
    ]
