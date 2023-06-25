from rest_framework import serializers

from users.models import User

from transactions.models import Transaction


class TransactionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

    def create(self, validated_data):
        transaction = Transaction(
            user=validated_data['user'],
            amount=validated_data['amount'],
            reason=validated_data['reason'],
        )
        transaction.save()
        return transaction


class TransactionBaseModelSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects
    )

    class Meta:
        model = Transaction
        fields = '__all__'
