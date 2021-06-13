from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """Define a model manager for User model"""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

    def create_supplier(self, email, password, **extra_fields):
        """Create and save a Supplier with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_supplier', True)

        return self._create_user(email, password, **extra_fields)


class AccountBase(AbstractBaseUser, PermissionsMixin):
    """Abstract model for Accounts"""
    business_name = models.CharField(max_length=150, blank=True, null=True)
    business_address = models.TextField(blank=True, null=True)
    email = models.EmailField(blank=True, unique=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    is_supplier = models.BooleanField(
        _('supplier'),
        default=False,
        help_text=_(
            'Supplier Account. '
            'Account for suppliers.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('account')
        verbose_name_plural = _('accounts')
        abstract = True

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_name(self):
        """Return the short name for the user."""
        return self.business_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)


class Account(AccountBase):
    """Model for Accounts"""
    class Meta(AccountBase.Meta):
        swappable = 'AUTH_USER_MODEL'


class SupplierRepresentatives(models.Model):
    """More details about suppliers"""
    supplier = models.OneToOneField(
        Account, on_delete=models.CASCADE, related_name="account")
    primary_full_name = models.CharField(max_length=150, blank=True, null=True)
    primary_email = models.EmailField(blank=True, null=True)
    # phone number entered might have dashes or other characters
    primary_phone = models.CharField(max_length=20, blank=True, null=True)
    secondary_full_name = models.CharField(
        max_length=150, blank=True, null=True)
    secondary_email = models.EmailField(blank=True, null=True)
    secondary_phone = models.CharField(max_length=20, blank=True, null=True)
    products = models.ManyToManyField(
        "ProductService", related_name="products_services"
    )


class ProductService(models.Model):
    """Products and services sold by suppliers"""
    name = models.CharField(max_length=150)
