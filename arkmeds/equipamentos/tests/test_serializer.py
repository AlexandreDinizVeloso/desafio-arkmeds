from django.test import TestCase
from ..models import Equipamento
from ..serializers import EquipamentoSerializer

class EquipamentoSerializerTest(TestCase):
    def test_serialization(self):
        equipamento = Equipamento.objects.create(
            tipo="Notebook",
            fabricante="Apple",
            modelo="MacBook Pro",
            numero_serie="ABC123456789",
            valor_compra=10000.00
        )
        serializer = EquipamentoSerializer(equipamento)
        data = serializer.data
        self.assertEqual(data['tipo'], 'Notebook')
        self.assertEqual(data['fabricante'], 'Apple')
        self.assertEqual(data['modelo'], 'MacBook Pro')
        
    def test_serializer_invalid_data(self):
        data = {
            'tipo': '',
            'fabricante': '',
            'modelo': '',
            'numero_serie': ''
        }
        serializer = EquipamentoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'tipo', 'fabricante', 'modelo', 'numero_serie'})
