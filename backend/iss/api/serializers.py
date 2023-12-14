from rest_framework.serializers import ModelSerializer
from ..models import Iss

class IssSerializer(ModelSerializer):
    class Meta:
        model = Iss
        fields = ('__all__')