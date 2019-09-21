"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework.routers import SimpleRouter
from rest_framework import permissions
from inventory import views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_swagger.views import get_swagger_view


router = SimpleRouter()
router.register("contacts", views.ContactAPIView, "contacts")
router.register("company", views.CompanyAPIView, "company")
router.register("items", views.ItemsAPIView, "items")


api_patterns = [
    url(r"^", include(router.urls)),
]

schema_view = get_schema_view(
   openapi.Info(
      title="TxT Inventory API",
      default_version='v1.0',
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

api_patterns += [
   url(r'^swagger(?P<format>\.json|\.yaml)$',
       schema_view.without_ui(cache_timeout=0), name='schema-json'),

   url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0),
       name='schema-swagger-ui'),

   url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0),
       name='schema-redoc'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1.0/", include((api_patterns, "backend"), namespace="v1.0")),
]
