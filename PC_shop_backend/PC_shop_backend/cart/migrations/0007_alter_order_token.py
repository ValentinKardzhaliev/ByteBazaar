# Generated by Django 4.2.7 on 2024-04-05 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0006_alter_cart_token_alter_order_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='token',
            field=models.UUIDField(blank=True, editable=False, null=True),
        ),
    ]
