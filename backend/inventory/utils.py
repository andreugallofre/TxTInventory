import requests
from django.core.files.base import ContentFile

from inventory.models import Contact


def create_contact(name, email, phone):
    contact = Contact(name=name, email=email, phone=phone)
    contact.save()


def list_contacts():
    contacts = Contact.objects.order_by("name")
    return contacts


def get_contact(pk):
    contact = Contact.objects.get(id=pk)
    return contact
