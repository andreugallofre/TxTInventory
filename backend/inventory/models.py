from django.db import models

# Create your models here.


class Item(models.Model):

    name = models.CharField(max_length=255, null=False)
    serial_number = models.CharField(max_length=255, null=False)

    def __str__(self):
        return "{} - {}".format(self.name, self.serial_number)
