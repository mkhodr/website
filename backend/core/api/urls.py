from rest_framework.routers import DefaultRouter
from iss.api.urls import iss_router
from django.urls import path, include

router = DefaultRouter()

# iss
router.registry.extend(iss_router.registry)

urlpatterns = [
    path('', include(router.urls))
]
