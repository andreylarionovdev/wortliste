# Generated by Django 3.1.1 on 2020-09-09 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0007_auto_20200909_2305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='plural_ending',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='word',
            name='translate',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
