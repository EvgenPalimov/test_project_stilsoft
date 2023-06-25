from rest_framework import status
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from transactions.models import Transaction
from transactions.serializers import TransactionModelSerializer, \
    TransactionBaseModelSerializer
from users.models import User


# Create your views here.
class TransactionViewSet(ViewSet, GenericAPIView):
    queryset = Transaction.objects.filter(on_delete=False)
    ordering = '-date_created'

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TransactionBaseModelSerializer
        return TransactionModelSerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            Transaction.objects.filter(on_delete=False).
            order_by('-date_created'),
            many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            self.change_score(request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(self.queryset, pk=pk)
        serializer = TransactionBaseModelSerializer(queryset)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.queryset.get(pk=kwargs['pk'])
        data = request.data
        user = User.objects.get(username=data['user'])
        data['user'] = user.id
        serializer = self.get_serializer(instance, data=data,
                                         partial=partial)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_update(serializer)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            self.change_score(request)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        try:
            trans = Transaction.objects.get(pk=kwargs['pk'])
            if trans.on_delete:
                trans.on_delete = False
                trans.save()
            else:
                trans.on_delete = True
                trans.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def change_score(self, request) -> None:
        user_balance = request.user.balance
        amount = float(request.data.get('amount'))
        if request.data.get('reason') == Transaction.RECEIPT:
            user_balance.score += amount
            user_balance.save()
        else:
            user_balance.score -= amount
            user_balance.save()
