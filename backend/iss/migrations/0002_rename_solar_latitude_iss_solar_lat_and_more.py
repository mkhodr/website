# Generated by Django 4.2.7 on 2023-11-21 22:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('iss', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='iss',
            old_name='solar_latitude',
            new_name='solar_lat',
        ),
        migrations.RenameField(
            model_name='iss',
            old_name='solar_longitude',
            new_name='solar_lon',
        ),
    ]