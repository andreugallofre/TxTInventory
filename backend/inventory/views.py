from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_swagger.views import get_swagger_view
from .models import Item, Company, Contact
from .serializers import ContactSerializer

# Create your views here.


class ContactAPIView(APIView):
    def get(self, request):
        contacts = Contact.objects.all()
        return Response({'contacts': contacts})

    def post(self, request):
        contact = request.data.get('contact')

        serializer = ContactSerializer(data=contact)
        if serializer.is_valid(raise_exception=True):
            contact_saved = serializer.save()
        return Response({"success": "Contact '{}' created successfully"
                        .format(contact_saved.name)})