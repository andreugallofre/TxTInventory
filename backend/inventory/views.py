from django.shortcuts import render
from rest_framework import viewsets
from rest_framework_swagger.views import get_swagger_view
from .models import Item
from .serializers import ItemSerializer

# Create your views here.


class ListItemView(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
