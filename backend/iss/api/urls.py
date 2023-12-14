from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import IssViewSet


iss_router = DefaultRouter()
iss_router.register(r'iss', IssViewSet, basename='iss')