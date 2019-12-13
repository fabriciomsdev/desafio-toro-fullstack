from rest_framework import viewsets
from django.contrib.auth.models import AnonymousUser
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

class UserCreateMixin(object):
  user_field = 'user'

  def get_user_field(self):
    """
    You can dynamically change the user field
    """
    return self.user_field

  def perform_create(self, serializer):
    if serializer.instance and serializer.instance.user is None:
      kwargs = {
          self.get_user_field(): self.request.user
      }

      serializer.save(**kwargs)
    else:
      serializer.save()

  def perform_update(self, serializer):
    if serializer.instance.user is None:
      kwargs = {
          self.get_user_field(): self.request.user
      }

      serializer.save(**kwargs)
    else:
      owner = serializer.instance.user
      serializer.save()
      serializer.instance.user = owner
      serializer.instance.save()
