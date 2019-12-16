from django.db import models
from main.models import SafeDeleteModel, BelongsToUserModel


ORDER_CHOICES = (
    ('sell', 'Draw',),
    ('bought', 'Deposit',),
)

OPERATION_CHOICES = (
    ('draw', 'Draw',),
    ('deposit', 'Deposit',),
)

class Operation(BelongsToUserModel):
    value = models.FloatField(null=True, blank=True, default=0)
    operation_type = models.CharField(
        choices=OPERATION_CHOICES, null=True, blank=True, max_length=10)


class Order(BelongsToUserModel):
    quantity = models.FloatField(null=True, blank=True, default=0)
    sigla = models.CharField(null=True, blank=True, max_length=10)
    order_type = models.CharField(
        choices=ORDER_CHOICES, null=True, blank=True, max_length=10)
    value = models.FloatField(null=True, blank=True, default=0)

    def create_an_operation(self):
        operation_type = 'draw'
        if self.order_type == 'sell':
            operation_type = 'deposit'

        operation = Operation(value=self.value, operation_type=operation_type, user=self.user)
        operation.save()

    def save(self, **kwargs):
        super(Order, self).save(**kwargs)
        self.create_an_operation()

    def update(self, **kwargs):
        super(Order, self).update(**kwargs)
        self.create_an_operation()

