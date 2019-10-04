from rest_framework import serializers
from odas.models import Satellite

# Lead Serializer
class SatelliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Satellite
        fields = '__all__'