# Generated by Django 2.2.6 on 2019-12-16 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0004_auto_20191213_2329'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='value',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
