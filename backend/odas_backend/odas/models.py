from django.db import models

# Create your models here.
class Satellite(model.Models):
    name = models.CharField(max_length=64)
    mission_description = models.CharField(max_length=512)
    year_lauched = models.DateTimeField(auto_now_add=True)