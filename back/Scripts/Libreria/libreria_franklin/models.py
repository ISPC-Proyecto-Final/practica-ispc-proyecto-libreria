from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    id_user = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=150, unique=True)
    telephone_number = models.CharField(max_length=50, blank=False)
    telephone_area_code = models.CharField(max_length=50, blank=False)
    document = models.PositiveIntegerField(blank=True, null=True)
    address_province = models.CharField(max_length=50, blank=False) 
    address_location = models.CharField(max_length=50, blank=False)
    address_street = models.CharField(max_length=50, blank=False)
    postal_code = models.CharField(max_length=50, blank=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

class Author(models.Model):
    id_author = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    class Meta:
        db_table = 'Author'
        verbose_name = 'Books Author'
        verbose_name_plural = 'Authors'
    def __unicode__(self):
        return self.name
    def __str__(self):
        return self.name
    
class Publisher(models.Model):
    id_publisher = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    class Meta:
        db_table = 'Publisher'
        verbose_name = 'Books Publisher'
        verbose_name_plural = 'Publishers'
    def __unicode__(self):
        return self.name
    def __str__(self):
        return self.name
    
class Genre(models.Model):
    id_genre = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    class Meta:
        db_table = 'Genre'
        verbose_name = 'Books Genre'
        verbose_name_plural = 'Genres'
    def __unicode__(self):
        return self.name
    def __str__(self):
        return self.name

class Book(models.Model):
    id_book = models.AutoField(primary_key=True)
    isbn = models.CharField( max_length=20, blank=False)
    title = models.CharField(max_length=200, blank=False)
    page_amount = models.PositiveIntegerField(blank=False)
    book_cover = models.CharField(max_length=500)
    stock= models.PositiveIntegerField(blank=False, default=0)
    release_year = models.PositiveSmallIntegerField(blank=False)
    synopsis = models.TextField(max_length=3000, blank=False)
    price = models.DecimalField(max_length=200, decimal_places=2, max_digits=50,blank=False)
    tags = models.CharField(max_length=300,  blank=False)
    author = models.ForeignKey(Author, to_field='id_author',related_name="author", on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, to_field='id_publisher',related_name="publisher", on_delete=models.CASCADE)
    # genre = models.ForeignKey(Genre, to_field='id_genre',related_name="genre", on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre, null=True)
    class Meta:
        db_table = 'Book'
        verbose_name = 'Book'
        verbose_name_plural = 'Books'
    def __unicode__(self):
        return self.isbn
    def __str__(self):
        return self.isbn


class Payment(models.Model):
    id_payment = models.AutoField(primary_key=True)
    card_association = models.IntegerField()
    number = models.BigIntegerField()
    cvv = models.IntegerField()
    expiration = models.DateField()
    class Meta:
        db_table = 'Payment'
        verbose_name =  'Payment'
        verbose_name_plural =  'Payments'
    def __unicode__(self):
        return self.card_association
    def __unicode__(self):
        return self.card_association

class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    class Meta:
        db_table = 'Rol'
        verbose_name =  'Rol'
        verbose_name_plural =  'Rols'
    def __unicode__(self):
        return self.id_rol
    def __unicode__(self):
        return self.name


class Delivery(models.Model):
    id_delivery = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(max_length=150, blank=False)
    telephone_number = models.CharField(max_length=50, blank=False)
    telephone_area_code = models.CharField(max_length=50, blank=False)
    document = models.PositiveIntegerField(blank=True, null=True)
    address_province = models.CharField(max_length=50, blank=False) 
    address_location = models.CharField(max_length=50, blank=False)
    address_street = models.CharField(max_length=50, blank=False)
    postal_code = models.CharField(max_length=50, blank=False)
    status = models.CharField(max_length=50)
    class Meta:
        db_table = 'Delivery'
        verbose_name = 'Product sale delivery'
        verbose_name_plural = 'Delivery'
    def __unicode__(self):
        return self.address_street
    def __str__(self):
        return self.address_street

      
class Sell (models.Model):
  id_sell = models.AutoField(primary_key=True)
  saleDate = models.CharField(max_length=50, blank=False)
  deliveryType = models.CharField(max_length=50, blank=False)
  paymentType = models.CharField(max_length=50, blank=False)

  totalQuantity = models.IntegerField(blank=False)
  totalCost = models.DecimalField(decimal_places=2, blank=False, max_digits=50)

  user = models.ForeignKey(CustomUser, to_field= "id_user", related_name="user",on_delete=models.CASCADE)
  delivery= models.ForeignKey(Delivery, to_field="id_delivery", related_name="delivery", on_delete=models.CASCADE)
  # book= models.ForeignKey(Book, to_field="id_book", related_name="book", on_delete=models.CASCADE)
  books = models.ManyToManyField(Book, null=True)
  class Meta:
        db_table = 'Sell'
        verbose_name = 'Sell'
        verbose_name_plural = 'Sells'
  def __unicode__(self):
        return self.id_sell
  def __str__(self):
        return self.id_sell
      
class Store(models.Model):
  id_store = models.AutoField(primary_key=True)
  street_number = models.CharField(max_length = 50)
  province = models.CharField(max_length = 30)
  locality = models.CharField(max_length = 30)
  telephone = models.CharField(max_length=20)
  class Meta:
      db_table = 'Store'
      verbose_name = 'Store'
      verbose_name_plural = 'Stores'
  def __str__(self):
    return "{self.street_number}, {self.locality}"

class Coupon(models.Model):
  id_coupon = models.AutoField(primary_key=True)
  name = models.CharField(max_length = 100)
  discount = models.DecimalField(decimal_places=2, blank=False, max_digits=5)

  class Meta:
      db_table = 'Coupon'
      verbose_name = 'Coupon'
      verbose_name_plural = 'Coupons'
  def __str__(self):
    return "{self.coupon_name}, {self.discount_percent}"

class SubscriptionBook(models.Model):
  id_subscription_book = models.AutoField(primary_key=True)
  book_name = models.CharField(max_length = 100)
  active = models.BooleanField(default=False)

  class Meta:
      db_table = 'SubscriptionBook'
      verbose_name = 'SubscriptionBook'
      verbose_name_plural = 'SubscriptionBooks'
  def __str__(self):
    return "{self.cid_subscription_book}, {self.book_name}, {self.active}"
