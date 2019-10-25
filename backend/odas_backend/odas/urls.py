from rest_framework import routers

from .api import SatelliteViewSet, ComponentViewSet, MeasurementViewSet, UnitsViewSet
from .api import SatelliteViewSet
from django.urls import path
from . import views

router = routers.DefaultRouter()
router.register('api/satellites', SatelliteViewSet, 'satellites')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/measurements', MeasurementViewSet, 'measurements')
router.register('api/units', UnitsViewSet, 'units')


urlpatterns = [
    path('email/', views.index, name='index'),
    path('success/', views.successView, name='success'),
    path('files/', views.file_view, name='file_list'),
    path('files/upload/', views.upload_view, name='upload_file'),
]

urlpatterns += router.urls