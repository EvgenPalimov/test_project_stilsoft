from django.contrib.auth.models import AbstractUser
from django.db import models

from balance.models import Balance


class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    balance = models.ForeignKey(Balance, verbose_name='user_balance',
                                on_delete=models.CASCADE)

    class Meta:
        ordering = ['username']
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.username
