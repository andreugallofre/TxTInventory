from rest_framework import serializers

from .models import *


class ItemSerializer(serializers.ModelSerializer):

    donation_company = serializers.RelatedField(many=False, read_only=True)
    reciever_company = serializers.RelatedField(many=False, read_only=True)

    class Meta:
        model = Item
        fields = ('name', 'serial_number', 'entry_date',
                  'donation_date', 'reciever_company',
                  'donation_company')


class ContactSerializer(serializers.ModelSerializer):

    name = serializers.CharField(max_length=120)
    email = serializers.EmailField(max_length=254)
    phone = serializers.CharField(max_length=255)

    class Meta:
        model = Contact
        fields = ('name', 'email', 'phone')


class CompanySerializer(serializers.ModelSerializer):

    contact = serializers.RelatedField(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('name', 'tax_id', 'address', 'contact')
