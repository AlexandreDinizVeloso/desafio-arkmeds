from django.db import models

class Equipamento(models.Model):
    tipo = models.CharField(max_length=200)
    fabricante = models.CharField(max_length=200)
    modelo = models.CharField(max_length=200)
    numero_serie = models.CharField(max_length=200)
    data_compra = models.DateField(null=True, blank=True, default=None)
    valor_compra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.tipo} - {self.fabricante} - {self.modelo}"

