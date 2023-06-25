from rest_framework import serializers

from balance.models import Balance
from users.models import User


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user_balance = Balance.objects.create()
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            is_staff=validated_data['is_staff'],
            balance=user_balance
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserBaseModelSerializer(serializers.ModelSerializer):
    balance = serializers.SlugRelatedField(
        slug_field='score',
        queryset=Balance.objects
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',
                  'balance', 'is_active', 'is_staff',)
