from django.http import HttpResponse
from .serializers import OrderSerializer, OperationSerializer
from .models import Order, Operation
from main.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from main.views import (UserCreateMixin, NestedViewSetMixin, ModelViewSet)

class OrderViewSet(UserCreateMixin, NestedViewSetMixin, ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsOwnerOrReadOnly, )

    def list(self, request):
        boughts = self.queryset.filter(user=request.user, order_type="sell")
        sells = self.queryset.filter(user=request.user, order_type="bought")

        boughts = self.serializer_class(boughts, many=True)
        sells = self.serializer_class(sells, many=True)

        return Response({
            'boughts': boughts.data,
            'sells': sells.data
        })


class OperationViewSet(UserCreateMixin, NestedViewSetMixin, ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer
    permission_classes = (IsOwnerOrReadOnly, )

    def list(self, request):
        draws = self.queryset.filter(user=request.user, operation_type="draw")
        deposits = self.queryset.filter(user=request.user, operation_type="deposit")

        draws = self.serializer_class(draws, many=True)
        deposits = self.serializer_class(deposits, many=True)

        return Response({
            'draws': draws.data,
            'deposits': deposits.data
        })
