from django.contrib import admin
from .models import Donor, Claim


@admin.register(Donor)
class DonorAdmin(admin.ModelAdmin):
    list_display = ('title', 'donor', 'Quantity', 'District', 'expiry_at', 'food_type', 'created_at')
    list_filter = ('food_type', 'District', 'created_at')
    search_fields = ('title', 'donor__username', 'District', 'description', 'Address')
    readonly_fields = ('created_at', 'expiry_at')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Food Information', {
            'fields': ('title', 'description', 'Quantity', 'food_type', 'people_can_feed')
        }),
        ('Donor', {
            'fields': ('donor',)
        }),
        ('Location & Contact', {
            'fields': ('Address', 'District', 'pincode', 'phone')
        }),
        ('Expiry', {
            'fields': ('expiry_hours', 'expiry_at')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(Claim)
class ClaimAdmin(admin.ModelAdmin):
    list_display = ('food', 'claimer', 'quantity_claimed', 'status', 'claimed_at')
    list_filter = ('status', 'claimed_at')
    search_fields = ('claimer__username', 'food__title', 'claimer_name')
    readonly_fields = ('claimed_at', 'updated_at')
    list_editable = ('status',)
    date_hierarchy = 'claimed_at'
    ordering = ('-claimed_at',)
