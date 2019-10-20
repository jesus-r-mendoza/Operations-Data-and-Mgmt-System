from rest_framework import routers
from .api import SatelliteViewSet, ComponentViewSet, CollectableViewSet, MeasurementViewSet

router = routers.DefaultRouter()
router.register('api/satellites', SatelliteViewSet, 'satellites')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/collectables', CollectableViewSet, 'collectables')
router.register('api/measurements', MeasurementViewSet, 'measurements')

urlpatterns = router.urls