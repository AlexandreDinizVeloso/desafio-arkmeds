from django.db import models

class Equipamento(models.Model):
    tipo = models.CharField(blank=False, null=False,)
    fabricante = models.CharField(blank=False, null=False)
    modelo = models.CharField(blank=False, null=False)
    numero_serie = models.CharField(blank=False, null=False)
    data_compra = models.DateField()
    valor_compra = models.DecimalField(decimal_places=2)

    def __str__(self):
        return f"{self.tipo} - `{self.fabricante} - {self.modelo} - {self.numero_serie} - {self.data_compra} - {self.valor_compra}"