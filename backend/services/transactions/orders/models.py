from django.db import models
from main.models import SafeDeleteModel, BelongsToUserModel


ORDER_CHOICES = (
    ('draw', 'Draw',),
    ('deposit', 'Deposit',),
)

OPERATION_CHOICES = (
    ('sell', 'Draw',),
    ('bought', 'Deposit',),
)

class Order(BelongsToUserModel):
    quantity = models.FloatField(null=True, blank=True, default=0)
    sigla = models.CharField(null=True, blank=True, max_length=10)
    order_type = models.CharField(
        choices=ORDER_CHOICES, null=True, blank=True, max_length=10)


class Operation(BelongsToUserModel):
    price = models.FloatField(null=True, blank=True, default=0)
    operation_type = models.CharField(
        choices=OPERATION_CHOICES, null=True, blank=True, max_length=10)

