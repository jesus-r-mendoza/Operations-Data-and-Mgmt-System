from rest_framework import routers
from .api import SatelliteViewSet
from django.urls import path
from . import views

router = routers.DefaultRouter()
router.register('api/satellites', SatelliteViewSet, 'satellites')




urlpatterns = [
    path('', views.index, name='index'),
    path('success/', views.successView, name='success'),
]

urlpatterns += router.urls