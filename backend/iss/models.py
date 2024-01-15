from django.db import models

# Create your models here.

class Iss(models.Model):
    units = [('kilometers', 'km'), ('miles' ,'mi')]

    latitude = models.FloatField()
    longitude = models.FloatField()
    altitude = models.FloatField()
    velocity = models.FloatField()
    timestamp = models.FloatField()
    visibility = models.CharField(max_length=25)
    solar_lat = models.FloatField()
    solar_lon = models.FloatField()
    units = models.CharField(max_length=10, choices=units)

