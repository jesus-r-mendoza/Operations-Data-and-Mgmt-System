from rest_framework import routers

from .api import UnitsViewSet
from django.urls import path, register_converter
from . import views, converters

router = routers.DefaultRouter()
router.register('api/units', UnitsViewSet, 'units')

register_converter(converters.ManyIdConverter, 'many-id')
register_converter(converters.DateTimeConverter, 'dt')

urlpatterns = [
    path('api/sat/', views.satellites, name='satellites'),
    path('api/sat/<int:satellite_id>/recent/<int:quantity>/', views.recent_measurements, name='recent'),
    path('api/sat/<int:satellite_id>/comp/<int:component_id>/recent/<int:quantity>/', views.recent_by_component, name='recent_by_comp'),
    path('api/sat/<int:satellite_id>/comp/', views.components_of_satellite, name='sat_comp'),
    path('api/sat/<int:satellite_id>/comp/<many-id:component_ids>/recent/<int:quantity>/', views.with_many_components, name='recent_by_many_comp'),
    path('api/sat/<int:satellite_id>/meas/<dt:from_date>/<dt:to_date>/', views.comp_measu_from_to, name='meas_from_to'),
    path('api/sat/<int:satellite_id>/meas/comp/<int:component_id>/<dt:from_date>/<dt:to_date>/', views.comp_measu_from_to, name='comp_meas_from_to'),
    path('api/sat/<int:satellite_id>/meas/comp/<many-id:component_ids>/<dt:from_date>/<dt:to_date>/', views.with_many_components, name='range_by_many_comp'),
]

urlpatterns += router.urls