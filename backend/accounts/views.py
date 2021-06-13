from rest_framework import generics, permissions

from accounts.models import Account, SupplierRepresentatives

from .serializers import (AccountSerializer, RegisterSerializer,
                          SupplierProfileSerializer)


class RegisterView(generics.CreateAPIView):
    queryset = Account.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


register_supplier_apiview = RegisterView.as_view()


class SupplierProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SupplierProfileSerializer

    def get_object(self):

        supplier = Account.objects.get(
            email=self.request.user.email
        )
        return SupplierRepresentatives.objects.get(supplier=supplier)


supplier_profile_view = SupplierProfileView.as_view()


class AccountListView(generics.ListAPIView):
    queryset = Account.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AccountSerializer


list_account_apiview = AccountListView.as_view()


class AccountRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AccountSerializer


detail_update_delete_account_apiview = AccountRUDView.as_view()
