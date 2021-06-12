from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import Account, SupplierRepresentatives


class RegisterSerializer(serializers.ModelSerializer):
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
    class Meta:
        model = Account
        fields = (
            'email',
            'business_name',
            'business_address'
        )
        extra_kwargs = {
            'business_name': {'required': True},
            'business_address': {'required': True}
        }


class SupplierProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SupplierRepresentatives
        fields = [
            'primary_full_name',
            'primary_phone',
            'primary_email',
            'secondary_full_name',
            'secondary_phone',
            'secondary_email'
        ]
