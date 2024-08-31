from django.db import models

class Equipamento(models.Model):
    tipo = models.CharField(blank=False, null=False,)
    fabricante = models.CharField(blank=False, null=False)
    modelo = models.CharField(blank=False, null=False)
    numero_serie = models.CharField(blank=False, null=False)
    data_compra = models.DateField()
    valor_compra = models.DecimalField(decimal_places=2)