from django.test import TestCase
from ..models import Equipamento

class EquipamentoModelTest(TestCase):
    def setUp(self):
        self.equipamento = Equipamento.objects.create(
            tipo="Monitor",
            fabricante="Dell",
            modelo="U2718Q",
            numero_serie="123456789",
            data_compra="2024-01-01",
            valor_compra=3000.00
        )

    def test_str_representation(self):
        self.assertEqual(str(self.equipamento), "Monitor - Dell - U2718Q")
    
    def test_data_compra_blank(self):
        equipamento = Equipamento.objects.create(
            tipo="Monitor",
            fabricante="Dell",
            modelo="U2718Q",
            numero_serie="123456789",
            data_compra=None,
            valor_compra=3000.00
        )
        self.assertIsNone(equipamento.data_compra)

    def test_valor_compra_blank(self):
        equipamento = Equipamento.objects.create(
            tipo="Monitor",
            fabricante="Dell",
            modelo="U2718Q",
            numero_serie="123456789",
            valor_compra=None
        )
        self.assertIsNone(equipamento.valor_compra)
        