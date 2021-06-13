from django.test import TestCase
from django.urls import reverse

from accounts.models import Account


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


class TestAPI(TestCase):
    def test_register(self):
        response = self.client.post(
            reverse("register_supplier_apiview"), data={
                "email": "abc@example.com",
                "business_name": "abc@example.com",
                "business_address": "abc@example.com",
                "password": "abcdeA1@",
                "password2": "abcdeA1@",
                "representative_full_name": "abc@example.com",
            }
        )
        self.assertEqual(response.status_code, 201)

    def test_index(self):
        response = self.client.get(reverse("index"))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse("schema-swagger-ui"))

    def test_permissions(self):
        myaccountpage = self.client.get(reverse("self_account_view"))
        self.assertIn(myaccountpage.status_code, [401, 403])
        myprofilepage = self.client.get(reverse("supplier_profile_view"))
        self.assertIn(myprofilepage.status_code, [401, 403])

        response = self.client.post(
            reverse("register_supplier_apiview"), data={
                "email": "abc@example.com",
                "business_name": "abc@example.com",
                "business_address": "abc@example.com",
                "password": "abcdeA1@",
                "password2": "abcdeA1@",
                "representative_full_name": "abc@example.com",
            }
        )
        self.assertEqual(response.status_code, 201)
        self.client.login(email="abc@example.com", password="abcdeA1@")
        myaccountpage = self.client.get(reverse("self_account_view"))
        self.assertEqual(myaccountpage.status_code, 200)
        myprofilepage = self.client.get(reverse("supplier_profile_view"))
        self.assertEqual(myprofilepage.status_code, 200)
