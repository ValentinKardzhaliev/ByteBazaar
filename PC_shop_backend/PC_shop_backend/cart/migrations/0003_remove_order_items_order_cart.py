# Generated by Django 4.2.7 on 2024-04-04 17:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0002_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='items',
        ),
        migrations.AddField(
            model_name='order',
            name='cart',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='cart.cart'),
            preserve_default=False,
        ),
    ]
