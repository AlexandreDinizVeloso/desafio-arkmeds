from rest_framework import serializers
from .models import Equipamento

class EquipamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipamento
        fields = ['id', 'tipo', 'fabricante', 'modelo', 'numero_serie', 'data_compra', 'valor_compra']
        extra_kwargs = {
            'data_compra': {'required': False, 'allow_null': True},
            'valor_compra': {'required': False, 'allow_null': True}
        }