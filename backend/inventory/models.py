from django.db import models


class Company(models.Model):

    name = models.CharField(max_length=255, null=False)
    tax_id = models.CharField(max_length=30, null=True)
    address = models.CharField(max_length=512, null=True)

    def __str__(self):
        return self.name


class Contact(models.Model):

    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=50)

    company = models.ForeignKey(Company, null=True, on_delete=models.CASCADE)


class Item(models.Model):

    name = models.CharField(max_length=255, null=False)
    serial_number = models.CharField(
        max_length=255,
        null=False,
        primary_key=True)

    entry_date = models.DateField(auto_now_add=True)
    donation_date = models.DateField(null=True)

    donation_company = models.ForeignKey(Company,
                                         related_name='donator',
                                         on_delete=models.CASCADE,
                                         null=True)
    reciever_company = models.ForeignKey(Company,
                                         related_name='reciever',
                                         on_delete=models.CASCADE,
                                         null=True,
                                         blank=True)
