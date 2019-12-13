from django.db import models
from .settings import AUTH_USER_MODEL
from safedelete.models import (SafeDeleteModel, SOFT_DELETE,)


class BaseModel(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True


class BelongsToUserModel(BaseModel):
    user = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)

    class Meta:
        abstract = True
