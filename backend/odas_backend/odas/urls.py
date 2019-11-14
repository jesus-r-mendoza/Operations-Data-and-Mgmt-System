from rest_framework import routers

from .api import SatelliteViewSet, ComponentViewSet, MeasurementViewSet, UnitsViewSet
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
    path('satest/', views.dbemail, name='db_test'),
    path('writetest/', views.dbwritefile, name='db_test'),
    path('files/upload/', views.upload_view, name='upload_file'),
    path('files/<int:pk>/', views.delete_file, name='delete_file'),
    path('api/satellites/<int:satellite_id>/recent/<int:quantity>/', views.recent_measurements, name='recent'),
    path('api/satellites/<int:satellite_id>/component/<int:component_id>/recent/<int:quantity>/', views.recent_by_component, name='recent_by_comp')
]

urlpatterns += router.urls