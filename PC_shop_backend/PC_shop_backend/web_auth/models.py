from django.contrib.auth.base_user import AbstractBaseUser
from django.core.validators import MinLengthValidator
from django.db import models


class WebProfile(AbstractBaseUser):
    NAME_MAX_LEN = 30
    NAME_MIN_LEN = 6

    PASS_MAX_LEN = 20
    PASS_MIN_LEN = 6

    EMAIL_MAX_LEN = 50
    EMAIL_MIN_LEN = 6

    username = models.CharField(
        max_length=NAME_MAX_LEN,
        validators=[
            MinLengthValidator(NAME_MIN_LEN)
        ],
    )

    email = models.EmailField(
        max_length=EMAIL_MAX_LEN,
        validators=[
            MinLengthValidator(EMAIL_MIN_LEN)
        ],
    )

    password = models.CharField(
        max_length=PASS_MAX_LEN,
        validators=[
            MinLengthValidator(PASS_MIN_LEN)
        ],
    )

