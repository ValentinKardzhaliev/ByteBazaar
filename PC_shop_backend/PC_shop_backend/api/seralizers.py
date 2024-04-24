from django.contrib.auth import get_user_model
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import password_validation as validators


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password')



class CreateUserSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = UserModel
        fields = (UserModel.USERNAME_FIELD, 'email', 'phone', 'password', 'password_confirmation',)

    def validate(self, data):
        password = data.get('password')
        password_confirmation = data.get('password_confirmation')

        if password and password_confirmation and password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        # Remove password_confirmation and phone from validated_data
        data.pop('password_confirmation', None)
        data.pop('phone', None)

        # Invoke password validators
        user = UserModel(**data)
        errors = {}
        try:
            validators.validate_password(password, user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        phone = validated_data.pop('phone', None)

        # Remove password_confirmation before user creation
        user = super().create(validated_data)
        user.set_password(password)
        user.save()


        return user

    def to_representation(self, instance):
        result = super().to_representation(instance)
        result.pop('password')
        result.pop('password_confirmation', None)  # Remove password_confirmation from the response
        return result

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

