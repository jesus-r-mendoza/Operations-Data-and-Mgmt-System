from odas.models import Satellite
from rest_framework import viewsets, permissions
from .serializers import SatelliteSerializer

# Satellite Viewset
class SatelliteViewSet(viewsets.ModelViewSet):
    queryset = Satellite.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SatelliteSerializer