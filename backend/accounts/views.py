from rest_framework import generics, permissions
from django.urls import reverse
from django.shortcuts import get_object_or_404, redirect
from accounts.models import Account, SupplierRepresentatives
from rest_framework.filters import OrderingFilter, SearchFilter

from .serializers import (AccountSerializer, RegisterSerializer,
                          SupplierProfileSerializer)


def index(request):
    return redirect(reverse("schema-swagger-ui"))


class RegisterView(generics.CreateAPIView):
    """Register a new supplier"""
    queryset = Account.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


register_supplier_apiview = RegisterView.as_view()


class SupplierProfileView(generics.RetrieveUpdateAPIView):
    """retrieve and update details on supplier representatives"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SupplierProfileSerializer

    def get_object(self):

        account = Account.objects.get(
            email=self.request.user.email
        )
        supplier = get_object_or_404(
            SupplierRepresentatives.objects.all(),
            supplier=account
        )
        return supplier


supplier_profile_view = SupplierProfileView.as_view()


class SelfAccountView(generics.RetrieveUpdateAPIView):
    """retrieve and update details on supplier account"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AccountSerializer

    def get_object(self):
        my_account = Account.objects.get(
            email=self.request.user.email
        )

        return my_account


self_account_view = SelfAccountView.as_view()


class AccountListView(generics.ListAPIView):
    """list all accounts [Admin only]"""
    queryset = Account.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AccountSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["business_name", "business_address", "email"]


list_account_apiview = AccountListView.as_view()


class AccountRUDView(generics.RetrieveUpdateDestroyAPIView):
    """retrieve, update or delete accounts [Admin only]"""
    queryset = Account.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AccountSerializer


detail_update_delete_account_apiview = AccountRUDView.as_view()
