# Generated by Django 4.2.7 on 2023-12-09 18:51

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_bytebazaaruserprofile_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='bytebazaaruserprofile',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, default='', max_length=128, null=True, region=None, unique=True),
        ),
    ]