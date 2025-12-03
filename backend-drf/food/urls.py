from django.urls import path
from .views import Donor_View, ClaimView


urlpatterns = [
    path('donor/', Donor_View.as_view()),          # GET all, POST create
    path('donor/<int:id>/', Donor_View.as_view()), # GET one, PUT, DELETE
    
    path('claims/', ClaimView.as_view()),          # GET all claims, POST create
    path('claims/<int:id>/', ClaimView.as_view()), # GET one, PUT, DELETE
]
