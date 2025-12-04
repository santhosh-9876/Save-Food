from django.contrib import admin
from .models import *


@admin.register(Donor)
class DonorAdmin(admin.ModelAdmin):
    list_display = ('food_name', 'donor', 'quantity', 'location', 'expiry_date', 'is_available', 'created_at')
    list_filter = ('is_available', 'expiry_date', 'created_at')
    search_fields = ('food_name', 'donor__username', 'location', 'description')
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('is_available',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Food Information', {
            'fields': ('food_name', 'description', 'quantity', 'food_type')
        }),
        ('Donor & Location', {
            'fields': ('donor', 'location', 'contact_info')
        }),
        ('Availability', {
            'fields': ('expiry_date', 'is_available')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
