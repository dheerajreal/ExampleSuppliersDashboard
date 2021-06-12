from django.urls import path
from .views import register_supplier_apiview


urlpatterns = [
    path('', register_supplier_apiview, name="register_supplier_apiview"),
]
