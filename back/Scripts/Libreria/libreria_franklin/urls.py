from rest_framework import routers
from .api import BookViewSet, AuthorViewSet, PublisherViewSet, GenreViewSet,SellViewSet, StoreViewSet, PaymentViewSet, DeliveryViewSet, LoginView, LogoutView, SignupView, ProfileView, UserList, ProfileViewSet, ProcessPayment, CouponViewSet, ContactMessageViewSet, DeleteUserView, CustomAuthToken, UserDeleteView
from django.urls import path, include

router = routers.DefaultRouter()

router.register('api/v1/books', BookViewSet, 'books')
router.register('api/v1/authors', AuthorViewSet, 'authors')
router.register('api/v1/publishers', PublisherViewSet, 'publishers')
router.register('api/v1/genres', GenreViewSet, 'genres')
router.register('api/v1/deliverys', DeliveryViewSet, 'deliverys')
router.register('api/v1/sells', SellViewSet, 'Sells')
router.register("api/v1/stores", StoreViewSet,"stores")
router.register("api/v1/payments", PaymentViewSet,"payments")
router.register("api/v1/profiles", ProfileViewSet,"profiles")
router.register("api/v1/coupons", CouponViewSet,"coupons")
router.register("api/v1/contact-messages", ContactMessageViewSet,"contact-messages")

urlpatterns = [
    *router.urls,
    # Auth views
    # path('auth/login/',LoginView.as_view(), name='auth_login'),
    path('auth/login/', CustomAuthToken.as_view(), name='auth_login'),
    path('auth/users/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('auth/register/', SignupView.as_view(), name='auth_signup'),
    path('user/profile/', ProfileView.as_view(), name='user_profile'),
    path('users/',UserList.as_view(), name='listar_usuarios'),
    path('user/delete/', DeleteUserView.as_view(), name='user_delete'),
    path('process-payment/', ProcessPayment.as_view(), name='process_payment'),    
]
# router_urls = router.urls