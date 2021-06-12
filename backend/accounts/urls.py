from django.urls import path
from .views import register_supplier_apiview, detail_update_delete_account_apiview, list_account_apiview


urlpatterns = [
    path('register/', register_supplier_apiview,
         name="register_supplier_apiview"),
    path('accounts/<pk>/', detail_update_delete_account_apiview,
         name="detail_update_delete_account_apiview"),
    path('accounts/', list_account_apiview,
         name="list_account_apiview"),


]
