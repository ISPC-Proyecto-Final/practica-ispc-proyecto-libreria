from django.core.management.base import BaseCommand
from libreria_franklin.models import Book, Author, Publisher, Genre, Store, Sell, CustomUser, Delivery, Payment
import json
import os

class Command(BaseCommand):
    help = 'Insert default data if table is empty'

    def handle(self, *args, **options):
        file_path = os.path.abspath('libreria_franklin/default data/publisher_data.json')
        if not Publisher.objects.exists():
            with open(file_path) as file:
                data = json.load(file)

            for publisher_data in data:
                name = publisher_data['name']
                Publisher.objects.create(name = name)

            self.stdout.write(self.style.SUCCESS('Default publishers inserted successfully.'))
        else:
            self.stdout.write('The Publisher table is not empty.')

        file_path = os.path.abspath('libreria_franklin/default data/author_data.json')
        if not Author.objects.exists():
            with open(file_path) as file:
                data = json.load(file)

            for author_data in data:
                name = author_data['name']
                Author.objects.create(name = name)

        file_path = os.path.abspath('libreria_franklin/default data/publisher_data.json')
        if not Publisher.objects.exists():
            with open(file_path) as file:
                data = json.load(file)
            for publisher_data in data:
                name = publisher_data['name']
                Publisher.objects.create(name = name)
            self.stdout.write(self.style.SUCCESS('Default publishers inserted successfully.'))
        else:
            self.stdout.write('The Publisher table is not empty.')

        file_path = os.path.abspath('libreria_franklin/default data/author_data.json')
        if not Author.objects.exists():
            with open(file_path) as file:
                data = json.load(file)
            for author_data in data:
                name = author_data['name']
                Author.objects.create(name = name)
            self.stdout.write(self.style.SUCCESS('Default authors inserted successfully.'))
        else:
            self.stdout.write('The Author table is not empty.') 

        file_path = os.path.abspath('libreria_franklin/default data/genre_data.json')
        if not Genre.objects.exists():
            with open(file_path) as file:
                data = json.load(file)
            for genre_data in data:
                name = genre_data['name']
                Genre.objects.create(name = name)
            self.stdout.write(self.style.SUCCESS('Default genres inserted successfully.'))
        else:
            self.stdout.write('The Genre table is not empty.')

        file_path = os.path.abspath('libreria_franklin/default data/book_data.json')
        if not Book.objects.exists():
            with open(file_path, encoding='utf-8') as file:
                data = json.load(file)
            for book_data in data:
                isbn = book_data['isbn']
                title = book_data['title']
                pageAmount = book_data['pageAmount']
                book_cover = book_data['img']
                stock = book_data['stock']
                release_year = book_data['releaseDate']
                synopsis = book_data['sinopsis']
                price = book_data['price']
                tag = book_data['tags']
                author = Author.objects.get(id_author = book_data['authorId'])
                publisher = Publisher.objects.get(id_publisher = book_data['publisherId'])
                genres = Genre.objects.filter(id_genre__in = book_data['genres'])
                book  = Book.objects.create( isbn = isbn, title = title, page_amount = pageAmount, 
                                    book_cover = book_cover, stock= stock, release_year = release_year, 
                                    synopsis = synopsis, price = price, tags = tag, author = author, 
                                    publisher = publisher)
                book.genres.set(genres)
            self.stdout.write(self.style.SUCCESS('Default books inserted successfully.'))
        else:
            self.stdout.write('The Book table is not empty.')  


        
        file_path = os.path.abspath('libreria_franklin/default data/store_data.json')
        if not Store.objects.exists():
            with open(file_path, encoding='utf-8') as file:
                data = json.load(file)

            for store_data in data:
          
                street_number = store_data['street_number']
                province = store_data['province']
                locality = store_data['locality']
                telephone = store_data['telephone']
                        
                Store.objects.create( street_number = street_number, province = province, 
                                    locality = locality, telephone = telephone)

            self.stdout.write(self.style.SUCCESS('Default store inserted successfully.'))
        else:
            self.stdout.write('The Store tabe is not empty.')
            
        
        # Insertar instancias de Delivery
        file_path = os.path.abspath('libreria_franklin/default data/delivery_data.json')
        if not Delivery.objects.exists():
            with open(file_path) as file:
                data = json.load(file)
            for delivery_data in data:
                id_delivery = delivery_data['id_delivery']
                name = delivery_data['name']
                email = delivery_data['email']
                telephone_number = delivery_data['telephone_number']
                telephone_area_code = delivery_data['telephone_area_code']
                document = delivery_data['document']
                address_province = delivery_data['address_province']
                address_location = delivery_data['address_location']
                address_street = delivery_data['address_street']
                postal_code = delivery_data['postal_code']
                status = delivery_data['status']

                Delivery.objects.create(id_delivery=id_delivery, name=name, email=email,
                                        telephone_number=telephone_number, telephone_area_code=telephone_area_code,
                                        document=document, address_province=address_province, address_location=address_location,
                                        address_street=address_street, postal_code=postal_code, status=status)

            self.stdout.write(self.style.SUCCESS('Default deliveries inserted successfully.'))
        else:
            self.stdout.write('The Delivery table is not empty.')    

        # Insertar Instancias de Payment
        file_path = os.path.abspath('libreria_franklin/default data/payment_data.json')
        if not Payment.objects.exists():
            with open(file_path) as file:
                data = json.load(file)

            for payment_data in data:
                id_payment = payment_data['id_payment']
                card_association = payment_data['card_association']
                number = payment_data['number']
                cvv = payment_data['cvv']
                expiration = payment_data['expiration']

                Payment.objects.create(id_payment=id_payment, card_association=card_association, number=number,
                                    cvv=cvv, expiration=expiration)

            self.stdout.write(self.style.SUCCESS('Default payments inserted successfully.'))
        else:
            self.stdout.write('The Payment table is not empty.')
            
         # Insertar instancias de Sell
        file_path_sell = os.path.abspath('libreria_franklin/default data/sell_data.json')
        if not Sell.objects.exists():
            with open(file_path_sell) as file:
                data = json.load(file)
            for sell_data in data:
                id_sell = sell_data['id_sell']
                orderNumber = sell_data['orderNumber']
                saleDate = sell_data['saleDate']
                #products = sell_data['products']
                deliveryType = sell_data['deliveryType']
                paymentType = sell_data['paymentType']
                totalQuantity = sell_data['totalQuantity']
                totalCost = sell_data['totalCost']
                profile = CustomUser.objects.get(id=sell_data['profileId'])
                delivery = Delivery.objects.get(id_delivery=sell_data['deliveryId'])
                payment = Payment.objects.get(id_payment=sell_data['paymentId'])
                book = Book.objects.get(isbn=sell_data['bookId'])

                Sell.objects.create(id_sell=id_sell, orderNumber=orderNumber, saleDate=saleDate,
                                    deliveryType=deliveryType, paymentType=paymentType,
                                    totalQuantity=totalQuantity, totalCost=totalCost, profile=profile,
                                    delivery=delivery, payment=payment, book=book)

            self.stdout.write(self.style.SUCCESS('Default sells inserted successfully.'))
        else:
            self.stdout.write('The Sell table is not empty.')
