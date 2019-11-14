from rest_framework import routers

from .api import SatelliteViewSet, ComponentViewSet, MeasurementViewSet, UnitsViewSet
from django.urls import path, register_converter
from . import views, converters

router = routers.DefaultRouter()
router.register('api/sat', SatelliteViewSet, 'sat')
router.register('api/comp', ComponentViewSet, 'comp')
router.register('api/meas', MeasurementViewSet, 'meas')
router.register('api/units', UnitsViewSet, 'units')

register_converter(converters.ManyIdConverter, 'many-id')
register_converter(converters.DateTimeConverter, 'dt')

urlpatterns = [
    path('email/', views.index, name='index'),
    path('success/', views.successView, name='success'),
    path('files/', views.file_view, name='file_list'),
    path('satest/', views.dbemail, name='db_test'),
    path('writetest/', views.dbwritefile, name='db_test'),
    path('files/upload/', views.upload_view, name='upload_file'),
    path('files/<int:pk>/', views.delete_file, name='delete_file'),
    path('api/sat/<int:satellite_id>/recent/<int:quantity>/', views.recent_measurements, name='recent'),
    path('api/sat/<int:satellite_id>/comp/<int:component_id>/recent/<int:quantity>/', views.recent_by_component, name='recent_by_comp'),
    path('api/sat/<int:satellite_id>/comp/', views.components_of_satellite, name='sat_comp'),
    path('api/sat/<int:satellite_id>/comp/<many-id:component_ids>/recent/<int:quantity>/', views.recent_by_many_components, name='recent_by_many_comp'),
    path('api/sat/<int:satellite_id>/meas/<dt:from_date>/<dt:to_date>/', views.comp_measu_from_to, name='meas_from_to'),
    path('api/sat/<int:satellite_id>/meas/comp/<int:component_id>/<dt:from_date>/<dt:to_date>/', views.comp_measu_from_to, name='comp_meas_from_to')
]

urlpatterns += router.urls