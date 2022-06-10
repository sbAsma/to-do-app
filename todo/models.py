from django.db import models
from django.utils import timezone


class Todo(models.Model):
    text = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text