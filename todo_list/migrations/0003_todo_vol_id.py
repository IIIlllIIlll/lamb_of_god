# Generated by Django 4.1.5 on 2023-02-07 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='vol_id',
            field=models.IntegerField(blank=True, default=False, null=True),
        ),
    ]
