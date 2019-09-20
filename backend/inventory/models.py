from django.db import models


class Item(models.Model):

    name = models.CharField(max_length=255, null=False)
    serial_number = models.CharField(
        max_length=255,
        null=False,
        primary_key=True)

    entry_date = models.DateField(auto_now=False, auto_now_add=True)
    donation_date = models.DateField(auto_now=False, auto_now_add=False)

    donation_company = models.ForeignKey(Company, on_delete=models.CASCADE)
    reciever_company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return "{} - {}".format(self.name, self.serial_number)


class Company(models.Model):

    name = models.CharField(max_length=255, null=False)
    tax_id = models.CharField(max_lenght=255, null=True)
    address = models.CharField(max_lenght=512, null=True)

    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)


class Contact(models.Model):

    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=254)
    phone = models.PhoneNumberField()
