from django.urls import reverse
from django.test import TestCase
from ..models import Equipamento

class EquipamentoViewTest(TestCase):
    def setUp(self):
        self.equipamento = Equipamento.objects.create(
            tipo="Impressora",
            fabricante="HP",
            modelo="LaserJet 1020",
            numero_serie="987654321"
        )

    def test_index_view(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'equipamentos/index.html')

    def test_api_list(self):
        response = self.client.get('/api/equipamentos/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_index_view_has_correct_context(self):
        response = self.client.get(reverse('index'))
        self.assertIn('equipamentos', response.context)
        self.assertEqual(len(response.context['equipamentos']), 1)
        self.assertEqual(response.context['equipamentos'][0].tipo, "Impressora")