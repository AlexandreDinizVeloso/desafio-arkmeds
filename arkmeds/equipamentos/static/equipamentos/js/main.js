function listarEquipamentos() {
    fetch('/api/equipamentos/')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging line
            let lista = document.getElementById('equipamentos-list');
            lista.innerHTML = '';
            data.forEach(equipamento => {
                let item = document.createElement('li');
                item.innerHTML = `
                    Tipo: ${equipamento.tipo || 'N/A'} - 
                    Fabricante: ${equipamento.fabricante || 'N/A'} - 
                    Modelo: ${equipamento.modelo || 'N/A'}
                    <button onclick="exibirDetalhes(${equipamento.id})">Detalhes</button>
                    <button onclick="editarEquipamento(${equipamento.id})">Editar</button>
                    <button onclick="deletarEquipamento(${equipamento.id})">Deletar</button>
                `;
                lista.appendChild(item);
            });
        })
        .catch(error => console.error('Error fetching equipamentos:', error)); // Handle errors
}

window.onload = listarEquipamentos;


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
        });
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
            document.getElementById('data_compra').value = data.data_compra;
            document.getElementById('valor_compra').value = data.valor_compra;
        });
}

function salvarEquipamento() {
    let id = document.getElementById('equipamento-id').value;
    let tipo = document.getElementById('tipo').value;
    let fabricante = document.getElementById('fabricante').value;
    let modelo = document.getElementById('modelo').value;
    let numero_serie = document.getElementById('numero_serie').value;
    let data_compra = document.getElementById('data_compra').value || null;
    let valor_compra = document.getElementById('valor_compra').value || null;

    data_compra = data_compra ? new Date(data_compra).toISOString().split('T')[0] : null;

    let url = '/api/equipamentos/';
    let method = 'POST'
    console.log(id)

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
        }),
    })
    .then(response => {
        if (response.ok) {
            listarEquipamentos();
            document.getElementById('equipamento-form').reset();
            document.getElementById('equipamento-id').value = '';
        } else {
            alert('Erro ao salvar equipamento.');
        }
    });
}

function deletarEquipamento(id) {
    if (confirm('Tem certeza que deseja deletar este equipamento?')) {
        fetch(`/api/equipamentos/${id}/`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                listarEquipamentos();
            } else {
                alert('Erro ao deletar equipamento.');
            }
        });
    }
}

document.getElementById('salvar-btn').addEventListener('click', () => salvarEquipamento());

window.onload = listarEquipamentos;
