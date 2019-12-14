# Generated by Django 2.2.6 on 2019-12-13 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_auto_20191213_2302'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='operation',
            name='price',
        ),
        migrations.AddField(
            model_name='operation',
            name='value',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
