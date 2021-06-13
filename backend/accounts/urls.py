from django.urls import path

from .views import (detail_update_delete_account_apiview, list_account_apiview,
                    register_supplier_apiview, supplier_profile_view, self_account_view)

urlpatterns = [
    path('register/', register_supplier_apiview,
         name="register_supplier_apiview"),
    path('profile/', supplier_profile_view,
         name="supplier_profile_view"),
    path('myaccount/', self_account_view,
         name="self_account_view"),

    path('accounts/<pk>/', detail_update_delete_account_apiview,
         name="detail_update_delete_account_apiview"),
    path('accounts/', list_account_apiview,
         name="list_account_apiview"),


]
