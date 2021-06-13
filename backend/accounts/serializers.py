import re

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Account, SupplierRepresentatives


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for registration of supplier accounts"""
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Account.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    representative_full_name = serializers.CharField(
        write_only=True,
        required=True
    )

    class Meta:
        model = Account
        fields = (
            'password',
            'password2',
            'email',
            'business_name',
            'business_address',
            "representative_full_name",
        )
        extra_kwargs = {
            'business_name': {'required': True},
            'business_address': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        pw = attrs['password']

        if not bool(re.match(r"^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$", pw)):

            raise serializers.ValidationError(
                {
                    "password": "Please enter a password with minimum eight characters, containing one digit, one special character, one uppercase letter, one lowercase letter."
                }
            )

        return attrs

    def create(self, validated_data):
        account = Account.objects.create_supplier(
            email=validated_data['email'],
            business_name=validated_data['business_name'],
            business_address=validated_data['business_address'],
            password=validated_data['password']
        )
        SupplierRepresentatives.objects.create(
            supplier=account,
            primary_full_name=validated_data['representative_full_name']
        )
        return account


class AccountSerializer(serializers.ModelSerializer):
    """Serializer for accounts"""

    class Meta:
        model = Account
        read_only_fields = ['pk', 'is_staff', 'is_supplier']
        fields = [
            'email',
            'business_name',
            'business_address',

        ] + read_only_fields
        extra_kwargs = {
            'business_name': {'required': True},
            'business_address': {'required': True}
        }


class SupplierProfileSerializer(serializers.ModelSerializer):
    """serializer for extra details on suppliers"""
    supplier = AccountSerializer(read_only=True)

    class Meta:
        model = SupplierRepresentatives
        read_only_fields = ['pk']

        fields = [
            "supplier",
            'primary_full_name',
            'primary_phone',
            'primary_email',
            'secondary_full_name',
            'secondary_phone',
            'secondary_email'
        ] + read_only_fields
