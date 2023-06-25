from rest_framework.viewsets import ModelViewSet

from balance.models import Balance
from balance.serializers import BalanceModelSerializer


# Create your views here.

class BalanceViewSet(ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceModelSerializer
