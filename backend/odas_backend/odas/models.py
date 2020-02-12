from django.db import models
from django.contrib.auth.models import Group

class Satellite(models.Model):
    name = models.CharField(max_length=64)
    mission_description = models.CharField(max_length=512)
    year_launched = models.DateTimeField(auto_now_add=True)
    organization = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id}: {self.name}'

class Component(models.Model):
    satellite = models.ForeignKey(Satellite, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    model = models.CharField(max_length=64)
    category = models.CharField(max_length=64)
    description = models.CharField(max_length=512)

    def __str__(self):
        return f'{self.id}: {self.name}'

class Units(models.Model):
    units = models.CharField(max_length=64)

    def __str__(self):
        return f'{self.id}: {self.units}'

class Measurement(models.Model):
    satellite = models.ForeignKey(Satellite, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    units = models.ForeignKey(Units, on_delete=models.CASCADE)
    time_measured = models.DateTimeField(auto_now_add=True)
    value = models.FloatField()

    def __str__(self):
        s = f'{self.id}: | Satellite: {self.satellite.name} | Component: {self.component.name} | '
        s += f'Value: {self.value} | Time: {self.time_measured}'
        return s

class Risk(models.Model):
    satellite = models.ForeignKey(Satellite, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    units = models.ForeignKey(Units, on_delete=models.CASCADE)
    error = models.CharField(max_length=512)
    priority = models.IntegerField()
    value = models.ForeignKey(Measurement, on_delete=models.CASCADE)
    