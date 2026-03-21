from datetime import datetime
from zoneinfo import ZoneInfo
from django.utils import timezone
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication  # 🔐 JWT auth

from .models import Donor, Claim
from .serializers import Donor_Serializer, ClaimSerializer

IST = ZoneInfo("Asia/Kolkata")       # ✅ reuse this everywhere


class Donor_View(APIView):
    # 🔐 default: only authenticated users
    authentication_classes = [JWTAuthentication]      # <-- change if you use TokenAuth
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        """
        Allow anyone (even not logged in) to GET,
        but require login for POST / PUT / DELETE.
        """
        if self.request.method == "GET":
            return [AllowAny()]
        return [permission() for permission in self.permission_classes]

    def convert_to_ist(self, dt):
        """Convert datetime to IST and format in 12-hr time."""
        if dt is None:
            return None
        dt_ist = timezone.localtime(dt, IST)
        return dt_ist.strftime("%d-%m-%Y %I:%M %p")  # 01-12-2025 01:30 PM

    def get(self, request, id=None):
        if id is None:
            donors = Donor.objects.all().order_by("-id")
            serialized = Donor_Serializer(donors, many=True).data

            result = []
            now_ist = timezone.now().astimezone(IST)

            for donor, item in zip(donors, serialized):
                # Convert times to IST 12-hr
                item["created_at"] = self.convert_to_ist(donor.created_at)
                item["expiry_at"] = self.convert_to_ist(donor.expiry_at)

                # Calculate remaining time only if expiry_at exists
                if donor.expiry_at:
                    expiry_ist = donor.expiry_at.astimezone(IST)
                    diff = expiry_ist - now_ist
                    hours_left = diff.total_seconds() / 3600
                    item["hours_until_expiry"] = max(0, round(hours_left, 2))
                    item["donation_status"] = (
                        "Active ✅" if hours_left > 0 else "Expired ❌"
                    )
                else:
                    item["hours_until_expiry"] = None
                    item["donation_status"] = "Unknown ⏳"

                result.append(item)

            return Response(result, status=status.HTTP_200_OK)

        # Single donor
        donor = get_object_or_404(Donor, id=id)
        data = Donor_Serializer(donor).data

        data["created_at"] = self.convert_to_ist(donor.created_at)
        data["expiry_at"] = self.convert_to_ist(donor.expiry_at)

        now_ist = timezone.now().astimezone(IST)
        if donor.expiry_at:
            expiry_ist = donor.expiry_at.astimezone(IST)
            diff = expiry_ist - now_ist
            hours_left = diff.total_seconds() / 3600
            data["hours_until_expiry"] = max(0, round(hours_left, 2))
            data["donation_status"] = "Active ✅" if hours_left > 0 else "Expired ❌"
        else:
            data["hours_until_expiry"] = None
            data["donation_status"] = "Unknown ⏳"

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = Donor_Serializer(data=request.data)
        if serializer.is_valid():
            # Automatically set the donor to the current user
            serializer.save(donor=request.user)
            return Response(
                {"message": "Food Donation Added ✅", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        donor_obj = get_object_or_404(Donor, id=id)
        serializer = Donor_Serializer(donor_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Donation Updated ✅", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        donor_obj = get_object_or_404(Donor, id=id)
        donor_obj.delete()
        return Response(
          {"message": "Donation Deleted ✅"},
          status=status.HTTP_204_NO_CONTENT
        )


class ClaimView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def convert_to_ist(self, dt):
        """Convert datetime to IST and format in 12-hr time."""
        if dt is None:
            return None
        dt_ist = timezone.localtime(dt, IST)
        return dt_ist.strftime("%d-%m-%Y %I:%M %p")

    def get(self, request, id=None):
        """
        GET /claims/ - List all claims (or filter by food_id or user)
        GET /claims/<id>/ - Get specific claim
        """
        if id:
            claim = get_object_or_404(Claim, id=id)
            data = ClaimSerializer(claim).data
            data["claimed_at"] = self.convert_to_ist(claim.claimed_at)
            data["updated_at"] = self.convert_to_ist(claim.updated_at)
            return Response(data, status=status.HTTP_200_OK)

        # Filter options
        food_id = request.query_params.get('food_id')
        user_claims = request.query_params.get('my_claims')

        claims = Claim.objects.all()

        if food_id:
            claims = claims.filter(food_id=food_id)
        
        if user_claims == 'true':
            claims = claims.filter(claimer=request.user)

        claims = claims.order_by('-claimed_at')
        serialized = ClaimSerializer(claims, many=True).data

        # Convert timestamps
        for claim, item in zip(claims, serialized):
            item["claimed_at"] = self.convert_to_ist(claim.claimed_at)
            item["updated_at"] = self.convert_to_ist(claim.updated_at)

        return Response(serialized, status=status.HTTP_200_OK)

    def post(self, request):
        """Create a new claim"""
        data = request.data.copy()
        data['claimer'] = request.user.id

        serializer = ClaimSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save(claimer=request.user)
            return Response(
                {"message": "Claim submitted successfully ✅", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        """Update claim status or details"""
        claim = get_object_or_404(Claim, id=id)
        
        # Only allow claimer or food donor to update
        if claim.claimer != request.user and claim.food.donor != request.user:
            return Response(
                {"error": "You don't have permission to update this claim"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ClaimSerializer(claim, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Claim updated ✅", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """Cancel/delete a claim"""
        claim = get_object_or_404(Claim, id=id)
        
        # Only claimer can delete their own claim
        if claim.claimer != request.user:
            return Response(
                {"error": "You can only delete your own claims"},
                status=status.HTTP_403_FORBIDDEN
            )

        claim.delete()
        return Response(
            {"message": "Claim cancelled ✅"},
            status=status.HTTP_204_NO_CONTENT
        )
