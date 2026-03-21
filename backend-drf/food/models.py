from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User

class Donor(models.Model):
    FOOD_TYPE_CHOICES = [
        (1, "Veg"),
        (2, "Non-Veg"),
    ]

    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations', null=True, blank=True)
    title = models.CharField(max_length=150)
    description = models.TextField()
    Quantity = models.IntegerField()
    food_type = models.IntegerField(choices=FOOD_TYPE_CHOICES, default=1)
    expiry_hours = models.IntegerField()
    expiry_at = models.DateTimeField(blank=True, null=True)
    Address = models.TextField()
    District = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)
    phone = models.CharField(max_length=10)
    people_can_feed = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto calculate expiry_at using expiry_hours
        if self.expiry_hours:
            self.expiry_at = timezone.now() + timedelta(hours=self.expiry_hours)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Claim(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    food = models.ForeignKey(Donor, on_delete=models.CASCADE, related_name='claims')
    claimer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='food_claims')
    claimer_name = models.CharField(max_length=100)
    claimer_phone = models.CharField(max_length=10)
    claimer_address = models.TextField()
    quantity_claimed = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True, null=True)
    claimed_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-claimed_at']

    def __str__(self):
        return f"{self.claimer.username} claimed {self.food.title}"
