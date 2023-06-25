from rest_framework import serializers

from balance.models import Balance


class BalanceModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = '__all__'
