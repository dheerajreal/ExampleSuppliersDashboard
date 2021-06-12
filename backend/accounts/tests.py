from accounts.models import Account
from django.test import TestCase


class TestAccounts(TestCase):
    def test_users_in_db_count(self):
        self.account1 = Account.objects.create_user(
            email="account1@example.com", password="abc")
        self.supplier1 = Account.objects.create_supplier(
            email="supplier1@example.com", password="abc")
        self.admin = Account.objects.create_superuser(
            email="admin1@example.com", password="abc")

        users = Account.objects.all()
        self.assertEqual(users.count(), 3)

    def test_create_supplier(self):
        email = "supplier@example.com"
        password = "password"
        business_name = "abc"
        business_address = "abc street"
        supplier = Account.objects.create_supplier(
            email=email,
            password=password,
            business_name=business_name,
            business_address=business_address
        )
        self.assertEqual(supplier.is_supplier, True)
        self.assertEqual(supplier.is_staff, False)
        self.assertEqual(supplier.business_name, business_name)
        self.assertEqual(supplier.business_address, business_address)
        self.assertEqual(
            Account.objects.get(email=email),
            supplier
        )

    def test_create_admin(self):
        email = "admin@example.com"
        password = "password"
        admin = Account.objects.create_superuser(
            email=email,
            password=password,
        )
        self.assertEqual(admin.is_supplier, False)
        self.assertEqual(admin.is_superuser, True)
        self.assertIsNone(admin.business_name)
        self.assertIsNone(admin.business_address)
        self.assertEqual(
            Account.objects.get(email=email),
            admin
        )
