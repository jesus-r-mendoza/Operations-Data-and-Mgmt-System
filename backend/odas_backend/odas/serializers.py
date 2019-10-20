from rest_framework import serializers
from odas.models import Satellite, Component, Collectable, Measurement

# Lead Serializer
class SatelliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Satellite
        fields = '__all__'

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class CollectableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collectable
        fields = '__all__'

class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'