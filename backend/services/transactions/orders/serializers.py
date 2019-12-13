from main.serializers import UserPropertyModelSerializer
from .models import Operation, Order

class OrderSerializer(UserPropertyModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OperationSerializer(UserPropertyModelSerializer):
    class Meta:
        model = Operation
        fields = '__all__'
