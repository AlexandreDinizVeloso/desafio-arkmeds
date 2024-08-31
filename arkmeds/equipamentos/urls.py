from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EquipamentoViewSet

router = DefaultRouter()
router.register(r'equipamentos', EquipamentoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]