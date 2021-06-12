from accounts.models import Account
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework import permissions


class RegisterView(generics.CreateAPIView):
    queryset = Account.objects.all()
    permission_classes = (permissions.AllowAny)
    serializer_class = RegisterSerializer


register_supplier_apiview = RegisterView.as_view()
