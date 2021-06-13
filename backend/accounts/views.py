from rest_framework import generics, permissions

from accounts.models import Account, SupplierRepresentatives

from .serializers import (AccountSerializer, RegisterSerializer,
                          SupplierProfileSerializer)


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

        supplier = Account.objects.get(
            email=self.request.user.email
        )
        return SupplierRepresentatives.objects.get(supplier=supplier)


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


list_account_apiview = AccountListView.as_view()


class AccountRUDView(generics.RetrieveUpdateDestroyAPIView):
    """retrieve, update or delete accounts [Admin only]"""
    queryset = Account.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AccountSerializer


detail_update_delete_account_apiview = AccountRUDView.as_view()
