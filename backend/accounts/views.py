from accounts.models import Account
from rest_framework import generics
from .serializers import AccountSerializer, RegisterSerializer
from rest_framework import permissions


class RegisterView(generics.CreateAPIView):
    queryset = Account.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


register_supplier_apiview = RegisterView.as_view()


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
