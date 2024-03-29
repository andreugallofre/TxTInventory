from rest_framework import serializers

from .models import *


class CompanySerializer(serializers.ModelSerializer):

    contact_set = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Contact.objects.all())

    id = serializers.ReadOnlyField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'tax_id', 'address', 'contact_set')


class ContactSerializer(serializers.ModelSerializer):

    name = serializers.CharField(max_length=120)
    email = serializers.EmailField(max_length=254)
    phone = serializers.CharField(max_length=255)

    company = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all()
    )

    id = serializers.ReadOnlyField()

    class Meta:
        model = Contact
        fields = ('id', 'name', 'email', 'phone', 'company')


class CreateItemSerializer(serializers.ModelSerializer):

    donation_company = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Company.objects.all())
    reciever_company = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Company.objects.all())

    class Meta:
        model = Item
        fields = ('name', 'serial_number', 'entry_date',
                  'donation_date', 'reciever_company',
                  'donation_company')


class ItemSerializer(serializers.ModelSerializer):

    donation_company = serializers.StringRelatedField()
    reciever_company = serializers.StringRelatedField()

    id = serializers.ReadOnlyField()

    class Meta:
        model = Item
        fields = ('id', 'name', 'serial_number', 'entry_date',
                  'donation_date', 'reciever_company',
                  'donation_company')
