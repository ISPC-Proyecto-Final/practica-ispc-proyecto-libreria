from rest_framework import viewsets, permissions
from rest_framework.generics import RetrieveUpdateAPIView, DestroyAPIView
from .serializers import BookSerializer, AuthorSerializer, PublisherSerializer, GenreSerializer, SellSerializer, StoreSerializer, PaymentSerializer, DeliverySerializer, ProfileSerializer, CouponSerializer, SubscriptionBookSerializer, AuthTokenSerializer
from .models import Book, Author, Publisher, Genre, Sell, Store, Payment, Delivery, CustomUser, SubscriptionBook, Coupon, CustomUser
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status, generics
from django.db.models import Q
import json
import mercadopago
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User

class LoginView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        # Recuperamos las credenciales y autenticamos al usuario
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(email=email, password=password)
        # Si es correcto añadimos a la request la información de sesión
        if user:
            login(request, user)
            return Response(
                UserSerializer(user).data,
                status=status.HTTP_200_OK)
        # Si no es correcto devolvemos un error en la petición
        return Response(
            status=status.HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        # Borramos de la request la información de sesión
        logout(request)

        # Devolvemos la respuesta al cliente
        return Response(status=status.HTTP_200_OK)

class CustomAuthToken(ObtainAuthToken):
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'id_user': user.id_user,
            'last_login': user.last_login,
            'is_superuser': user.is_superuser,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
            'is_active': user.is_active,
            'date_joined': user.date_joined,
            'email': user.email,
            'telephone_number': user.telephone_number,
            'telephone_area_code': user.telephone_area_code,
            'document': user.document,
            'address_province': user.address_province,
            'address_location': user.address_location,
            'address_street': user.address_street,
            'postal_code': user.postal_code,
            'token': token.key,
        })

class UserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        self.perform_destroy(user)
        return Response(status=status.HTTP_204_NO_CONTENT)          
    
class SignupView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer


class BookViewSet(viewsets.ModelViewSet, RetrieveUpdateAPIView):
   queryset = Book.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = BookSerializer
   lookup_field = 'id_book'

   def get_queryset(self):
        search_query = self.request.GET.get('search', '')

        if search_query:
            queryset = Book.objects.filter(
                Q(title__icontains=search_query)
            )
        else:
            queryset = Book.objects.all()

        return queryset

class CouponViewSet(viewsets.ModelViewSet):
   queryset = Coupon.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = CouponSerializer

class SubscriptionBookViewSet(viewsets.ModelViewSet):
   queryset = SubscriptionBook.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = SubscriptionBookSerializer

class AuthorViewSet(viewsets.ModelViewSet):
   queryset = Author.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = AuthorSerializer   

class PublisherViewSet(viewsets.ModelViewSet):
   queryset = Publisher.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = PublisherSerializer

class GenreViewSet(viewsets.ModelViewSet):
   queryset = Genre.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = GenreSerializer     

class SellViewSet(viewsets.ModelViewSet):
   queryset = Sell.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = SellSerializer

   def get_queryset(self):
        queryset = Sell.objects.all()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset           

class DeliveryViewSet(viewsets.ModelViewSet):
   queryset = Delivery.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = DeliverySerializer
      
   
class StoreViewSet(viewsets.ModelViewSet, RetrieveUpdateAPIView):
    queryset =Store.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StoreSerializer
    lookup_field = 'id_store'

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PaymentSerializer

class ProfileViewSet(viewsets.ModelViewSet):
   queryset = CustomUser.objects.all()
   permission_classes = [permissions.AllowAny]
   serializer_class = ProfileSerializer


class ProfileView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated] #Solo usuarios logueados pueden ver.
    serializer_class = UserSerializer
    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    def perform_update(self, serializer):
        serializer.save()

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    http_method_names = ['get']
    permission_classes = [AllowAny]
    def list(self, request):
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
        # if self.request.user.is_authenticated:
        #     return Response(serializer.data)

class ProcessPayment(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        return Response({"status": "ok"})

class DeleteUserView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)        

# class ProcessPaymentA(APIView):
#     def post(self, request):
#         try:
#             request_values = json.loads(request.body)
#             payment_data = {
#                 "transaction_amount": float(request_values["transaction_amount"]),
#                 "token": request_values["token"],
#                 "installments": int(request_values["installments"]),
#                 "payment_method_id": request_values["payment_method_id"],
#                 "issuer_id": request_values["issuer_id"],
#                 "payer": {
#                     "email": request_values["payer"]["email"],
#                     "identification": {
#                         "type": request_values["payer"]["identification"]["type"],
#                         "number": request_values["payer"]["identification"]["number"],
#                     },
#                 },
#             }

#             sdk = mercadopago.SDK("")

#             payment_response = sdk.payment().create(payment_data)

#             payment = payment_response["response"]
#             status = {
#                 "id": payment["id"],
#                 "status": payment["status"],
#                 "status_detail": payment["status_detail"],
#             }

#             return Response(data={"body": status, "statusCode": payment_response["status"]}, status=201)
#         except Exception as e:
#             return Response(data={"body": payment_response}, status=400)


          