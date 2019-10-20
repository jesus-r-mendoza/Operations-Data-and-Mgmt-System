from odas.models import Satellite, Component, Collectable, Measurement
from rest_framework import viewsets, permissions
from .serializers import SatelliteSerializer, ComponentSerializer, CollectableSerializer, MeasurementSerializer 

# Satellite Viewset
class SatelliteViewSet(viewsets.ModelViewSet):
    queryset = Satellite.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SatelliteSerializer

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ComponentSerializer

class CollectableViewSet(viewsets.ModelViewSet):
    queryset = Collectable.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CollectableSerializer

class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MeasurementSerializer