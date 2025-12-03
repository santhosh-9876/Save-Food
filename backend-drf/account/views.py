from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import Register_Serializer, Login_Serializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny

class Register_View(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = Register_Serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Successfully registered"},
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class Login_View(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = Login_Serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)

            return Response({
                "message": "Successfully Login",
                "username": user.username,
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class Logout_View(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data.get("refresh"))
            token.blacklist()
            return Response(
                {"message": "Logout successful"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST
            )
