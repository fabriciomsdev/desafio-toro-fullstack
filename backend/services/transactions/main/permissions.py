from rest_framework import permissions
from django.db.models import Sum

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.user == request.user


class HasSuficientBalance(permissions.BasePermission):
    """
    Test if user has suficient balance to bought orders and get draw opetarions.
    """
    message = "You don't have suficient balance"

    def has_permission(self, request, view):
        # Check if is a operation that remove values.
        if request.method == 'POST':
            if request.data.get('operation_type') == 'draw' or request.data.get('order_type') == 'bought':
                bank_operations = request.user.operation_set.all()
                deposits = bank_operations.filter(operation_type='deposit')
                balance = deposits.aggregate(
                    Sum('value')).get('value__sum') or 0

                if int(request.data.get('value')) <= balance:
                    return True
                else:
                    return False
            
        # if is a other methods operarions.
        return True
