from django.urls import path
from .views import register_supplier_apiview, detail_update_delete_account_apiview, list_account_apiview, supplier_profile_view


urlpatterns = [
    path('register/', register_supplier_apiview,
         name="register_supplier_apiview"),
    path('profile/', supplier_profile_view,
         name="supplier_profile_view"),

    path('accounts/<pk>/', detail_update_delete_account_apiview,
         name="detail_update_delete_account_apiview"),
    path('accounts/', list_account_apiview,
         name="list_account_apiview"),


]
