from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)
from rest_framework.viewsets import GenericViewSet

from inventory.models import Contact, Company, Item
from inventory.serializers import (
    ContactSerializer,
    CompanySerializer,
    ItemSerializer,
    CreateItemSerializer
)

# Create your views here.


class ContactAPIView(GenericViewSet,  # generic view functionality
                     CreateModelMixin,  # handles POSTs
                     RetrieveModelMixin,  # handles GETs for 1 Company
                     ListModelMixin):  # handles GETs for many Companies

    serializer_class = ContactSerializer
    queryset = Contact.objects.all()


class CompanyAPIView(GenericViewSet,  # generic view functionality
                     CreateModelMixin,  # handles POSTs
                     RetrieveModelMixin,  # handles GETs for 1 Company
                     ListModelMixin):

    serializer_class = CompanySerializer

    queryset = Company.objects.all()


class ItemsAPIView(GenericViewSet, CreateModelMixin, RetrieveModelMixin,
                   ListModelMixin):

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateItemSerializer
        else:
            return ItemSerializer

    queryset = Item.objects.all()
