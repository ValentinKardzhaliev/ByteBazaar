# Generated by Django 4.2.7 on 2024-07-13 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0012_alter_headphones_sensitivity_db_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='computer',
            name='type',
            field=models.CharField(choices=[('computer', 'Computer'), ('laptop', 'Laptop'), ('monitor', 'Monitor'), ('keyboard', 'Keyboard'), ('mouse', 'Mouse'), ('headphones', 'Headphones')], max_length=20),
        ),
        migrations.AlterField(
            model_name='keyboard',
            name='type',
            field=models.CharField(choices=[('computer', 'Computer'), ('laptop', 'Laptop'), ('monitor', 'Monitor'), ('keyboard', 'Keyboard'), ('mouse', 'Mouse'), ('headphones', 'Headphones')], max_length=20),
        ),
        migrations.AlterField(
            model_name='laptop',
            name='type',
            field=models.CharField(choices=[('computer', 'Computer'), ('laptop', 'Laptop'), ('monitor', 'Monitor'), ('keyboard', 'Keyboard'), ('mouse', 'Mouse'), ('headphones', 'Headphones')], max_length=20),
        ),
        migrations.AlterField(
            model_name='monitor',
            name='type',
            field=models.CharField(choices=[('computer', 'Computer'), ('laptop', 'Laptop'), ('monitor', 'Monitor'), ('keyboard', 'Keyboard'), ('mouse', 'Mouse'), ('headphones', 'Headphones')], max_length=20),
        ),
        migrations.AlterField(
            model_name='mouse',
            name='type',
            field=models.CharField(choices=[('computer', 'Computer'), ('laptop', 'Laptop'), ('monitor', 'Monitor'), ('keyboard', 'Keyboard'), ('mouse', 'Mouse'), ('headphones', 'Headphones')], max_length=20),
        ),
    ]