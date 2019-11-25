from django.db import models
from django.contrib.auth.models import Group

class Invite(models.Model):
    organization = models.ForeignKey(Group, on_delete=models.CASCADE)
    # link is 12 chars long because of django.utils.crypto.get_random_string() default length is 12
    link = models.CharField(max_length=12, db_index=True, unique=True)

    def __str__(self):
        return f'{self.organization}: {self.link}'