from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Upload(models.Model):
    description = models.CharField(max_length=100)
    upfile = models.FileField(upload_to='files/uploads/')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.description
    def delete(self, *args, **kwargs):
        self.upfile.delete()
        super().delete(*args, **kwargs)

