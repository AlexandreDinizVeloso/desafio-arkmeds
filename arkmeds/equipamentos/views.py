from django.shortcuts import render
from rest_framework import viewsets
from .models import Equipamento
from .serializers import EquipamentoSerializer

class EquipamentoViewSet(viewsets.ModelViewSet):
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoSerializer

def index(request):
    equipamentos = Equipamento.objects.all()
    return render(request, 'equipamentos/index.html', {'equipamentos': equipamentos})