from odas.models import Satellite, Component, Measurement, Units
from rest_framework import viewsets, permissions
from .serializers import SatelliteSerializer, ComponentSerializer, MeasurementSerializer, UnitsSerializer

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

class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MeasurementSerializer


class UnitsViewSet(viewsets.ModelViewSet):
    queryset = Units.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UnitsSerializer