# Generated manually

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='food_type',
            field=models.IntegerField(choices=[(1, 'Veg'), (2, 'Non-Veg')], default=1),
        ),
    ]
