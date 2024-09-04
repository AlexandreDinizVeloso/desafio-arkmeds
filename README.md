# Desafio Técnico Arkmeds
<img src="https://img.shields.io/static/v1?label=Version&message=1.0.0&color=FF2102&style=for-the-badge&logo="/>

Projeto criado visando o funcionamento de uma aplicação web onde um usuário pode cadastrar, editar, deletar e
visualizar os equipamentos de sua empresa.

 - ✅ Aplicação Web:
    - ✅ Configuração de ambiente;
        - ✔️ Configurar um ambiente virtual Python.
        - ✔️ Configurar um projeto Django.
        - ✔️ Configurar o sqlite como banco de dados da aplicação.

    - ✅ Modelagem do Banco de Dados;
       - ✔️ Criar um modelo de dados para o equipamento com os atributos: Tipo, Fabricante, Modelo, Número de série, Data de compra, Valor de compra.
       - ✔️ Criar as migrações e aplicá-las para gerar as tabelas no banco de dados sqlite.

    - ✅ API REST;
       - ✔️ Criar APIs REST utilizando Django Rest Framework para gerenciar os equipamentos
       - ✔️ As APIs devem contemplar as operações CRUD (Create, Read, Update, Delete).
       - ✅ Endpoints a serem implementados:
            - ✔️ GET /api/equipamentos/ - Listar todos os equipamentos.
            - ✔️ POST /api/equipamentos/ - Adicionar um novo equipamento.
            - ✔️ GET /api/equipamentos/<id>/ - Visualizar detalhes de um equipamento específico.
            - ✔️ PUT /api/equipamentos/<id>/ - Atualizar informações de umequipamento específico.
            - ✔️ DELETE /api/equipamentos/<id>/ - Deletar um equipamento específico.

    - ✅ Interface Web;
        - ✔️ Criar uma interface web utilizando HTML e JavaScript para interagir com as APIs.
        - ✅ A interface deve permitir as seguintes funcionalidades:
            - ✔️ Listar todos os equipamentos.
            - ✔️ Adicionar um novo equipamento.
            - ✔️ Editar um equipamento.
            - ✔️ Deletar um equipamento.
            - ✔️ Visualizar os detalhes de um equipamento específico.
---

# Sumário

- [Status](#status)
- [Habilidades desenvolvidas](#habilidades-desenvolvidas)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Organização e Estruturação do Projeto](#organização-e-estruturação-do-projeto)
- [Pré-requisitos](#pré-requisitos)
  - [Configuração do ambiente](#configuração-do-ambiente)
  - [Executando o projeto](#executando-o-projeto)
  - [Quer contribuir com o projeto?](#quer-contribuir-com-o-projeto)
- [Organização e Estruturação do Projeto](#organização-e-estruturação-do-projeto)
- [Contribuição](#contribuição)
- [Autor](#autor)

---

# Status

Este projeto está finalizado, mas sempre visando melhoras gráficas e adição de novas funcionalidades.

---

# Habilidades desenvolvidas

- Aprimoramento do uso do GIT;
- Entendimento sobre testes e suas tecnologias;
- Aprendizado em relação ao uso do Django em conjunto ao API Rest

---

# Tecnologias utilizadas

- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django Rest](https://www.django-rest-framework.org/)
- [Coverage](https://coverage.readthedocs.io/en/7.6.1/)
- [Selenium](https://www.selenium.dev/)

---

# Organização e Estruturação do Projeto

O projeto está organizado e estruturado da seguinte maneira:
```bash
ª   .gitignore
ª   README.md
ª   requirements.txt
ª   
+---arkmeds
ª   ª   .coverage
ª   ª   db.sqlite3
ª   ª   geckodriver.log
ª   ª   manage.py
ª   ª   
ª   +---arkmeds
ª   ª   ª   asgi.py
ª   ª   ª   settings.py
ª   ª   ª   urls.py
ª   ª   ª   wsgi.py
ª   ª   ª   __init__.py
ª   ª   ª          
ª   +---equipamentos
ª   ª   ª   .coveragerc
ª   ª   ª   admin.py
ª   ª   ª   apps.py
ª   ª   ª   models.py
ª   ª   ª   serializers.py
ª   ª   ª   tests.py
ª   ª   ª   urls.py
ª   ª   ª   views.py
ª   ª   ª   __init__.py
ª   ª   ª       
ª   ª   +---migrations
ª   ª   ª   ª   0001_initial.py
ª   ª   ª   ª   __init__.py
ª   ª   ª   ª            
ª   ª   +---static
ª   ª   ª   +---equipamentos
ª   ª   ª       +---css
ª   ª   ª       ª       style.css
ª   ª   ª       ª       
ª   ª   ª       +---js
ª   ª   ª               main.js
ª   ª   ª               
ª   ª   +---templates
ª   ª   ª   +---equipamentos
ª   ª   ª           index.html
ª   ª   ª           
ª   ª   +---tests
ª   ª   ª   ª   test_model.py
ª   ª   ª   ª   test_serializer.py
ª   ª   ª   ª   test_ui.py
ª   ª   ª   ª   test_view.py
ª   ª   ª   ª   __init__.py
ª   ª   ª   ª
```

---

# Pré-requisitos

## Configuração do ambiente

1. Clone o repositório.
    ```bash
        git@github.com:AlexandreDinizVeloso/desafio-arkmeds.git # Via SSH
    ```
   
    
2. Localize, crie e ative o ambiente virtual:
    ```bash
    cd desafio-arkmeds
    python -m venv env
    source env/bin/activate  # Linux/Mac
    env\Scripts\activate  # Windows
    ```
3. Instale as dependências e acesse o projeto:
    ```bash
    pip install -r requirements.txt
    cd arkmeds
    ```
4. Rode as migrações:
    ```bash
    python manage.py migrate
    ```

5. Execute os testes:
    ```bash
    coverage run manage.py test # Executará os testes
    coverage report # Mostrará o resultado dos testes no console
    coverage html # Irá criar um arquivo .html com o resultado dos testes
    ```

## Executando o projeto

1. Inicie o servidor:
    ```bash
    python manage.py runserver
    ```

2. Acesse o link que aparecerá no console:
    ```bash
        (env) python manage.py runserver

        Watching for file changes with StatReloader
        Performing system checks...

        System check identified no issues (0 silenced).
        September 04, 2024 - 15:10:26
        Django version 3.2.25, using settings 'arkmeds.settings'
        Starting development server at http://127.0.0.1:8000/ # Exemplo de resultado no console
        Quit the server with CTRL-BREAK.
        
    ```

3. Encerre o servidor:
    - Utilize a combinação de teclas CTRL-BREAK

## Quer contribuir com o projeto?

  - Crie uma branch e faça sua contribuição:

    ```bash
    # Crie uma branch a partir da branch main
    $ git checkout -b nome-da-nova-branch

    # Adicione as mudanças desejadas com os devidos commits
    $ git add . # adiciona as mudanças ao stage do Git
    $ git commit -m 'informação do conteúdo do commit' # salvando as alterações de cada pequena alteração em um commit
    $ git push -u origin nome-da-nova-branch # adiciona a nova branch no repositório remoto do Projeto
    ```
    
  - Crie um novo `Pull Request` (PR):
     - Vá até a página de `Pull Requests` do repositório no GitHub
     - Clique no botão verde `"New pull request"`
     - Clique na caixa de seleção `"Compare"` e escolha a sua branch com atenção
     - Clique no botão verde `"Create pull request"`
     - Adicione uma descrição para o Pull Request
     - Clique no botão verde `"Create pull request"`
     - Me marque para revisar. [Alexandre](https://github.com/AlexandreDinizVeloso)

---

# Contribuição

Que tal entrar na lista de contribuidores?

---

# Autor

 <img src="https://avatars.githubusercontent.com/u/80282868" width="100px;" alt="Minha foto"/>
 <br />
  Alexandre Diniz Veloso
<br />
  Desenvolvedor e estudante do IFTM.

Entre em contato!

<section> 
  <a href="https://www.linkedin.com/in/alexandredinizveloso" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</section>
---
