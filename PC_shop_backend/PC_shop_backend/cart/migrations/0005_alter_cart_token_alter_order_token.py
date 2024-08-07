# Generated by Django 4.2.7 on 2024-04-04 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0004_order_token_alter_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='token',
            field=models.UUIDField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='token',
            field=models.UUIDField(blank=True, editable=False, null=True),
        ),
    ]
