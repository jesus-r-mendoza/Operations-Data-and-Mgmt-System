from rest_framework import routers
from .api import SatelliteViewSet

router = routers.DefaultRouter()
router.register('api/satellites', SatelliteViewSet, 'satellites')

urlpatterns = router.urls