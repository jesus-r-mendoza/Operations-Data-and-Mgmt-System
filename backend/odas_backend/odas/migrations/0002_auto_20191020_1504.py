# Generated by Django 2.2.6 on 2019-10-20 22:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('odas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Collectable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('units', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Measurement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_measured', models.DateTimeField(auto_now_add=True)),
                ('value', models.FloatField()),
                ('collectable', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='odas.Collectable')),
                ('satellite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='odas.Satellite')),
            ],
        ),
        migrations.CreateModel(
            name='Component',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('model', models.CharField(max_length=64)),
                ('category', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=512)),
                ('satellite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='odas.Satellite')),
            ],
        ),
        migrations.AddField(
            model_name='collectable',
            name='component',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='odas.Component'),
        ),
    ]
