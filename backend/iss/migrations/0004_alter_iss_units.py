# Generated by Django 4.2.7 on 2024-01-17 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iss', '0003_rename_unit_iss_units'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iss',
            name='units',
            field=models.CharField(choices=[('kilometers', 'km'), ('miles', 'mi')], max_length=10),
        ),
    ]
