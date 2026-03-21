from rest_framework import serializers
from .models import Donor, Claim


class Donor_Serializer(serializers.ModelSerializer):
    donor_id = serializers.SerializerMethodField()
    donor_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Donor
        fields = "__all__"
        read_only_fields = ("id", "donor", "created_at", "expiry_at")
    
    def get_donor_id(self, obj):
        return obj.donor.id if obj.donor else None
    
    def get_donor_username(self, obj):
        return obj.donor.username if obj.donor else "Anonymous"

    def validate_expiry_hours(self, value):
        if not (1 <= value <= 5):
            raise serializers.ValidationError("Expiry hours must be between 1 and 5.")
        return value

    def validate_food_type(self, value):
        if value not in [1, 2]:
            raise serializers.ValidationError("Food type must be 1 (Veg) or 2 (Non-Veg).")
        return value


class ClaimSerializer(serializers.ModelSerializer):
    claimer_username = serializers.CharField(source='claimer.username', read_only=True)
    food_title = serializers.CharField(source='food.title', read_only=True)
    
    class Meta:
        model = Claim
        fields = "__all__"
        read_only_fields = ("id", "claimer", "claimed_at", "updated_at")

    def validate_quantity_claimed(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0.")
        return value

    def validate(self, data):
        from django.utils import timezone
        from datetime import timedelta
        
        # Get the current user from context
        request = self.context.get('request')
        food = data.get('food')
        quantity_claimed = data.get('quantity_claimed', 0)
        
        if request and request.user:
            # Check if user is trying to claim their own donation
            if food and food.donor and food.donor == request.user:
                raise serializers.ValidationError(
                    "You cannot claim your own food donation."
                )
            
            today_start = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
            today_end = today_start + timedelta(days=1)
            
            # Check if user has already claimed ANY food today (limit: 1 food per day)
            existing_claim_today = Claim.objects.filter(
                claimer=request.user,
                claimed_at__gte=today_start,
                claimed_at__lt=today_end
            ).exists()
            
            if existing_claim_today:
                raise serializers.ValidationError(
                    "You have already claimed food today. You can only claim one food item per day."
                )
        
        # Check if food is still available (not expired)
        if food and food.expiry_at:
            if food.expiry_at < timezone.now():
                raise serializers.ValidationError("This food donation has expired.")
        
        # Check if quantity is available for this food item
        if food:
            total_claimed = sum(
                claim.quantity_claimed 
                for claim in food.claims.filter(status__in=['pending', 'approved'])
            )
            available = food.Quantity - total_claimed
            
            if quantity_claimed > available:
                raise serializers.ValidationError(
                    f"Only {available} quantity available. You requested {quantity_claimed}."
                )
        
        return data
