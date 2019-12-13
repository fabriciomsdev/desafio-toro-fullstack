from rest_framework import serializers

# Serializers define the API representation.
class UserPropertyModelSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
