# Generated by Django 4.0.8 on 2022-10-13 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_order_alter_product_image_shippingaddress_review_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
