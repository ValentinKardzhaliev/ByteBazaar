from django.contrib.auth import get_user_model, password_validation
from django.core import exceptions
from rest_framework import serializers
from PC_shop_backend.web_auth.models import WebProfile

UserModel = get_user_model()


class CreateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebProfile
        fields = ('username', 'email', 'password',)

    def create(self, validated_data):
        user = super().create(validated_data)

        user.set_password(validated_data['password'])
        user.save()

        return user

    def validate(self, data):
        # Invoke password validators
        user = UserModel(**data)
        password = data.get('password')
        errors = {}
        try:
            password_validation.validate_password(password, user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super().validate(data)

    def to_representation(self, instance):
        result = super().to_representation(instance)

        result.pop('password')

        return result

