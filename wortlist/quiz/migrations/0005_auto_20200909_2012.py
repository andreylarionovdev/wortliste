# Generated by Django 3.1.1 on 2020-09-09 20:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0004_auto_20200909_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='artikel',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='quiz.artikel'),
        ),
        migrations.AlterField(
            model_name='word',
            name='verb_form',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='quiz.verbform'),
        ),
        migrations.AlterField(
            model_name='word',
            name='verb_inf',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='quiz.word'),
        ),
    ]
