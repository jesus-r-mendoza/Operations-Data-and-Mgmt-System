from django.db import models

# Create your models here.
class Satellite(models.Model):
    name = models.CharField(max_length=64)
    mission_description = models.CharField(max_length=512)
    year_launched = models.DateTimeField(auto_now_add=True)

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

class Upload(models.Model):
    description = models.CharField(max_length=100)
    upfile = models.FileField(upload_to='files/uploads/')
    def __str__(self):
        return self.description
    def delete(self, *args, **kwargs):
        self.upfile.delete()
        super().delete(*args, **kwargs)
