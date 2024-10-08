const toggleButton = document.getElementById('toggle-theme');
const body = document.body;

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
});

body.classList.add('light-mode');

let itensPorPagina = 5;

function listarEquipamentos(pagina = 1, itens = itensPorPagina) {
    fetch('/api/equipamentos/')
        .then(response => response.json())
        .then(data => {
            let lista = document.getElementById('equipamentos-list');
            lista.innerHTML = '';

            let inicio = (pagina - 1) * itens;
            let fim = inicio + itens;
            let equipamentosPaginados = data.slice(inicio, fim);

            equipamentosPaginados.forEach(equipamento => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <strong>Tipo:</strong> ${equipamento.tipo || 'N/A'}<br/>
                        <strong>Fabricante:</strong> ${equipamento.fabricante || 'N/A'}<br/>
                        <strong>Modelo:</strong> ${equipamento.modelo || 'N/A'}
                    </td>
                    <td>
                        <div class="tooltip">
                            <i class="fa-solid fa-file-lines" onclick="exibirDetalhes(${equipamento.id})" style="cursor: pointer; margin-right: 10px;"></i>
                            <span class="tooltiptext">Detalhes</span>
                        </div>
                        <div class="tooltip">
                            <i class="fa-solid fa-pen" onclick="editarEquipamento(${equipamento.id})" style="cursor: pointer; margin-right: 10px;"></i>
                            <span class="tooltiptext">Editar</span>
                        </div>
                        <div class="tooltip">
                            <i class="fa-solid fa-trash" onclick="deletarEquipamento(${equipamento.id})" style="cursor: pointer; color: red;"></i>
                            <span class="tooltiptext">Deletar</span>
                        </div>
                    </td>

                `;
                lista.appendChild(row);
            });

            let totalPaginas = Math.ceil(data.length / itens);
            criarPaginacao(totalPaginas, pagina);
        })
        .catch(error => mostrarErro('Erro ao listar equipamentos: ' + error.message));
}

function exibirDetalhes(id) {
    fetch(`/api/equipamentos/${id}/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('detalhes-tipo').textContent = `Tipo: ${data.tipo}`;
            document.getElementById('detalhes-fabricante').textContent = `Fabricante: ${data.fabricante}`;
            document.getElementById('detalhes-modelo').textContent = `Modelo: ${data.modelo}`;
            document.getElementById('detalhes-numero-serie').textContent = `Número de Série: ${data.numero_serie}`;
            document.getElementById('detalhes-data-compra').textContent = `Data de Compra: ${data.data_compra}`;
            document.getElementById('detalhes-valor-compra').textContent = `Valor de Compra: ${data.valor_compra}`;
            document.getElementById('detalhes-equipamento').style.display = 'block';
        })
        .catch(error => mostrarErro('Erro ao exibir detalhes: ' + error.message));
}

function editarEquipamento(id) {
    fetch(`/api/equipamentos/${id}/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('equipamento-id').value = id;
            document.getElementById('tipo').value = data.tipo;
            document.getElementById('fabricante').value = data.fabricante;
            document.getElementById('modelo').value = data.modelo;
            document.getElementById('numero_serie').value = data.numero_serie;
            document.getElementById('data_compra').value = data.data_compra || null;
            document.getElementById('valor_compra').value = data.valor_compra;

            document.getElementById('form-title').textContent = 'Editar Equipamento';
            document.getElementById('equipamento-form-container').style.display = 'block';
        })
        .catch(error => mostrarErro('Erro ao editar equipamento: ' + error.message));
}

function salvarEquipamento() {
    let id = document.getElementById('equipamento-id').value;
    let tipo = document.getElementById('tipo').value;
    let fabricante = document.getElementById('fabricante').value;
    let modelo = document.getElementById('modelo').value;
    let numero_serie = document.getElementById('numero_serie').value;
    let data_compra = document.getElementById('data_compra').value || null;
    let valor_compra = document.getElementById('valor_compra').value;

    if (valor_compra < 0) {
        mostrarErro("O valor de compra não pode ser negativo.");
        return;
    }

    esconderErro();

    let url = '/api/equipamentos/';
    let method = 'POST';

    if (id) {
        url += `${id}/`;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo: tipo,
            fabricante: fabricante,
            modelo: modelo,
            numero_serie: numero_serie,
            data_compra: data_compra,
            valor_compra: valor_compra,
        })
    })
    .then(response => {
        if (response.ok) {
            listarEquipamentos();
            document.getElementById('equipamento-form-container').style.display = 'none';
        } else {
            response.json().then(data => mostrarErro('Erro ao salvar equipamento: ' + (data.detail || 'Verifique os campos e tente novamente.')));
        }
    })
    .catch(error => mostrarErro('Erro de rede: ' + error.message));
}

function deletarEquipamento(id) {
    if (confirm("Tem certeza que deseja deletar este equipamento?")) {
        fetch(`/api/equipamentos/${id}/`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                listarEquipamentos();
            } else {
                mostrarErro('Erro ao deletar equipamento');
            }
        })
        .catch(error => mostrarErro('Erro de rede: ' + error.message));
    }
}

function criarPaginacao(totalPaginas, paginaAtual) {
    let paginationButtons = document.getElementById('pagination-buttons');
    paginationButtons.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        let button = document.createElement('button');
        button.textContent = i;
        if (i === paginaAtual) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => listarEquipamentos(i, itensPorPagina));
        paginationButtons.appendChild(button);
    }
}

function mostrarErro(mensagem) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = mensagem;
    errorMessageDiv.style.display = 'block';

    setTimeout(() => {
        errorMessageDiv.style.opacity = '1';
        errorMessageDiv.style.transform = 'translateX(-50%) scale(1)';
    }, 10);

    setTimeout(() => {
        errorMessageDiv.style.opacity = '0';
        errorMessageDiv.style.transform = 'translateX(-50%) scale(0)';
        setTimeout(() => {
            errorMessageDiv.style.display = 'none';
        }, 500);
    }, 3000);
}
function esconderErro() {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none';
}

document.getElementById('adicionar-btn').addEventListener('click', function() {
    document.getElementById('equipamento-id').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('fabricante').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('numero_serie').value = '';
    document.getElementById('data_compra').value = '';
    document.getElementById('valor_compra').value = '';
    document.getElementById('form-title').textContent = 'Adicionar Equipamento';
    document.getElementById('equipamento-form-container').style.display = 'block';
});

document.getElementById('salvar-btn').addEventListener('click', salvarEquipamento);
document.getElementById('form-close').addEventListener('click', function() {
    document.getElementById('equipamento-form-container').style.display = 'none';
});
document.getElementById('detalhes-close').addEventListener('click', function() {
    document.getElementById('detalhes-equipamento').style.display = 'none';
});

document.getElementById('items-per-page').addEventListener('change', function() {
    itensPorPagina = parseInt(this.value);
    listarEquipamentos(1, itensPorPagina);
});

listarEquipamentos();
