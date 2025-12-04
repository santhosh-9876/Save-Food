from django.urls import path
from .views import Register_View, Login_View, Logout_View, CreateSuperuserView, PromoteToAdminView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('register/', Register_View.as_view(), name='register-user'),
    path('login/', Login_View.as_view(), name='login-user'),
    path('logout/', Logout_View.as_view(), name='logout-user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('setup-admin/', CreateSuperuserView.as_view(), name='setup-admin'),
    path('promote-admin/', PromoteToAdminView.as_view(), name='promote-admin'),
]