from rest_framework import routers

from .api import SatelliteViewSet, ComponentViewSet, MeasurementViewSet, UnitsViewSet
from django.urls import path, register_converter
from . import views, converters

router = routers.DefaultRouter()
router.register('api/satellites', SatelliteViewSet, 'satellites')
router.register('api/components', ComponentViewSet, 'components')
router.register('api/measurements', MeasurementViewSet, 'measurements')
router.register('api/units', UnitsViewSet, 'units')

register_converter(converters.ManyIdConverter, 'many-id')

urlpatterns = [
    path('email/', views.index, name='index'),
    path('success/', views.successView, name='success'),
    path('files/', views.file_view, name='file_list'),
    path('files/upload/', views.upload_view, name='upload_file'),
    path('api/satellites/<int:satellite_id>/recent/<int:quantity>/', views.recent_measurements, name='recent'),
    path('api/satellites/<int:satellite_id>/component/<int:component_id>/recent/<int:quantity>/', views.recent_by_component, name='recent_by_comp'),
    path('api/satellites/<int:satellite_id>/components/', views.components_of_satellite, name='sat_comp'),
    path('api/satellites/<int:satellite_id>/components/<many-id:component_ids>/recent/<int:quantity>/', views.recent_by_many_components, name='recent_by_many_comp')
]

urlpatterns += router.urls