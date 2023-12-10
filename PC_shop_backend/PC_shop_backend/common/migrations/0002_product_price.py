# Generated by Django 4.2.7 on 2023-12-08 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=200, max_digits=10),
            preserve_default=False,
        ),
    ]