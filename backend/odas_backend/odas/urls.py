from rest_framework import routers
from .api import SatelliteViewSet, ComponentViewSet, MeasurementViewSet, UnitsViewSet

router = routers.DefaultRouter()
router.register('api/satellites', SatelliteViewSet, 'satellites')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/measurements', MeasurementViewSet, 'measurements')
router.register('api/units', UnitsViewSet, 'units')

urlpatterns = router.urls