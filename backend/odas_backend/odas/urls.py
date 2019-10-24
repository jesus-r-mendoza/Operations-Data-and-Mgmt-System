from rest_framework import routers
from .api import SatelliteViewSet
from django.urls import path
from . import views

router = routers.DefaultRouter()
router.register('api/satellites', SatelliteViewSet, 'satellites')




urlpatterns = [
    path('', views.index, name='index'),
    path('success/', views.successView, name='success'),
    path('files/', views.file_view, name='file_list'),
    path('files/upload/', views.upload_view, name='upload_file'),
]

urlpatterns += router.urls