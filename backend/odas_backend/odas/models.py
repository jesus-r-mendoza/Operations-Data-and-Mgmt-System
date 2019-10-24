from django.db import models

# Create your models here.
class Satellite(models.Model):
    name = models.CharField(max_length=64)
    mission_description = models.CharField(max_length=512)
    year_lauched = models.DateTimeField(auto_now_add=True)
class Upload(models.Model):
    description = models.CharField(max_length=100)
    upfile = models.FileField(upload_to='files/uploads/')
    def __str__(self):
        return self.description