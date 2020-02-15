from django.urls import path, include
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('create-org/', views.register_org, name='create'),
    path('join/', views.join_org, name='join'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('deploy/', views.deploy, name='deploy')
]