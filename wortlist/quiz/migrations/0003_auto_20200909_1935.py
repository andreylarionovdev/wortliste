# Generated by Django 3.1.1 on 2020-09-09 19:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_auto_20200909_1913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='verb_form',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quiz.verbform'),
        ),
        migrations.AlterField(
            model_name='word',
            name='verb_inf',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quiz.word'),
        ),
    ]
