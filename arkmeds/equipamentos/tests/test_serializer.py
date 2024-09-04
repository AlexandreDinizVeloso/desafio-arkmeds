from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class EquipamentoIntegrationTest(StaticLiveServerTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.selenium = webdriver.Chrome()
        cls.selenium.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()

    def test_add_and_list_equipamentos(self):
        self.selenium.get(self.live_server_url)

        add_button = self.selenium.find_element(By.ID, 'adicionar-btn')
        add_button.click()

        tipo_input = self.selenium.find_element(By.ID, 'tipo')
        fabricante_input = self.selenium.find_element(By.ID, 'fabricante')
        modelo_input = self.selenium.find_element(By.ID, 'modelo')
        numero_serie_input = self.selenium.find_element(By.ID, 'numero_serie')
        valor_compra_input = self.selenium.find_element(By.ID, 'valor_compra')
        salvar_button = self.selenium.find_element(By.ID, 'salvar-btn')

        tipo_input.send_keys('Notebook')
        fabricante_input.send_keys('Dell')
        modelo_input.send_keys('XPS 13')
        numero_serie_input.send_keys('SN123456')
        valor_compra_input.send_keys('1500')

        salvar_button.click()

        WebDriverWait(self.selenium, 10).until(
            EC.text_to_be_present_in_element(
                (By.ID, 'equipamentos-list'),
                'Notebook'
            )
        )
        equipamentos_list = self.selenium.find_element(By.ID, 'equipamentos-list')
        self.assertIn('Notebook', equipamentos_list.text)
        self.assertIn('Dell', equipamentos_list.text)
        self.assertIn('XPS 13', equipamentos_list.text)
