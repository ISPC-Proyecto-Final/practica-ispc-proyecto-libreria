from ast import Store
from rest_framework import serializers
from .models import Book, Author, Publisher, Genre, Sell, Store, Payment, Delivery, CustomUser, Coupon, SubscriptionBook
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model, authenticate


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ('id_user', )

class SubscriptionBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionBook
        fields = '__all__'
        read_only_fields = ('id_subscription_book', )

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'
        read_only_fields = ('id_coupon', )

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
        read_only_fields = ('id_author', )       

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'
        read_only_fields = ('id_publisher', )

class GenreSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()

    def get_books(self, genre):
        books = genre.book_set.all()
        serializer = BookSerializer(books, many=True)
        return serializer.data
    class Meta:
        model = Genre
        fields = '__all__'
        read_only_fields = ('id_genre', )                     

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    publisher = PublisherSerializer(read_only=True)
    # genres = GenreSerializer(read_only=True, many=True)

    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(),
        source='author',
        write_only=True
    )
    publisher_id = serializers.PrimaryKeyRelatedField(
        queryset=Publisher.objects.all(),
        source='publisher',
        write_only=True
    )
    genre_ids = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(),
        source='genres',
        write_only=True,
        many=True
    )

    def update(self, instance, validated_data):
        author_id = validated_data.pop('author_id', None)
        publisher_id = validated_data.pop('publisher_id', None)
        genre_ids = validated_data.pop('genre_id', [])

        if author_id:
            instance.author_id = author_id.pk
        if publisher_id:
            instance.publisher_id = publisher_id.pk
         
        instance.genres.clear()
        
        for genre_id in genre_ids:
         genre = Genre.objects.get(pk=genre_id)
         instance.genres.add(genre)

        return super().update(instance, validated_data)
    class Meta:
        model = Book
        fields = '__all__' 

class GenreSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()

    def get_books(self, obj):
        books = Book.objects.filter(genres=obj)
        serializer = BookSerializer(books, many=True)
        return serializer.data
    class Meta:
        model = Genre
        fields = '__all__'
        read_only_fields = ('id_genre', )  
        
class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = '__all__'
        read_only_fields = ('id_delivery', )   
        
class SellSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    delivery = DeliverySerializer(read_only=True)

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        source='user',
        write_only=True
    )

    delivery_id = serializers.PrimaryKeyRelatedField(
        queryset=Delivery.objects.all(),
        source='delivery',
        write_only=True
    )

    book_ids = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(),
        source='books',
        write_only=True,
        many=True
    )
    class Meta:
        model = Sell
        fields = '__all__'        
        
class StoreSerializer (serializers.ModelSerializer):
  class Meta:
    model = Store
    fields = "__all__"
    read_only_fields = ('id_store', )
    
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required=True)
#     username = serializers.CharField(
#         required=True)
#     password = serializers.CharField(
#         min_length=8)

#     class Meta:
#         model = get_user_model()
#         fields = '__all__'
#     def validate_password(self, value):
#         return make_password(value)
    
# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = '__all__'
#         read_only_fields = ('__all__',)

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True)
    username = serializers.CharField(
        required=True)
    password = serializers.CharField(
        min_length=8)

    class Meta:
        model = get_user_model()
        fields = '__all__'

    def validate_password(self, value):
        return make_password(value)
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ('__all__',)

class AuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                username=email, password=password)
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs