from django.urls import path,re_path
from . import views

urlpatterns = [
    path('email/', views.index, name='index'),
    path('success/', views.successView, name='success'),
    path('files/', views.file_view, name='file_list'),
    path('filelist/', views.file_point, name='file_point'),
    path('satest/', views.dbemail, name='db_test'),
    path('writetest/', views.dbwritefile, name='db_test'),
    path('files/upload/', views.upload_view, name='upload_file'),
    path('files/delete/<int:pk>/<token>/', views.delete_file, name='delete_file'),
    path('files/download/<int:fid>/', views.download_view, name='file_download'),
]