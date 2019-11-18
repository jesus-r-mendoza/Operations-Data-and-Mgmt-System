from django.db import models

# Create your models here.

class Upload(models.Model):
    description = models.CharField(max_length=100)
    upfile = models.FileField(upload_to='files/uploads/')
    def __str__(self):
        return self.description
    def delete(self, *args, **kwargs):
        self.upfile.delete()
        super().delete(*args, **kwargs)