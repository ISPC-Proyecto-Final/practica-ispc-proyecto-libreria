from ast import Store
from django.contrib import admin
from .models import Author
from .models import Publisher
from .models import Genre
from .models import Book
from .models import Payment
from .models import Rol
from .models import Delivery
from .models import Sell
from .models import Store
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id_author', 'name')
class PublisherAdmin(admin.ModelAdmin):
    list_display = ('id_publisher', 'name')
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id_genre', 'name')
class BookAdmin(admin.ModelAdmin):
    list_display = ('isbn', 'title', 'page_amount', 'book_cover', 'stock', 'release_year', 'synopsis', 'price', 'author', 'publisher')
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id_payment', 'card_association', 'number', 'cvv', 'expiration')    

class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('id_delivery', 'address_street')  
class RolAdmin(admin.ModelAdmin):
    list_display = ('id_rol', 'name')   
class SellAdmin(admin.ModelAdmin):
    list_display = ('id_sell', 'saleDate', 'deliveryType', 'paymentType', 'totalQuantity', 'totalCost', 'delivery')    
class StoreAdmin(admin.ModelAdmin):
  list_display = ('id_store','street_number','province','locality','telephone')

@admin.register(get_user_model())
class CustomUserAdmin(UserAdmin):
    pass

admin.site.register(Author, AuthorAdmin)
admin.site.register(Publisher, PublisherAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Delivery, DeliveryAdmin)
admin.site.register(Rol, RolAdmin)
admin.site.register(Sell, SellAdmin)
admin.site.register(Store,StoreAdmin)
