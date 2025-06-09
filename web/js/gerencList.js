const API_URL = 'http://localhost:2222/tarefas';

function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;
    messageContainer.className = 'show ' + type;
    setTimeout(() => {
        messageContainer.className = '';
        messageContainer.textContent = '';
    }, 3000);
}

function fetchTarefas() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tarefas => {
            const aFazer = document.getElementById('a-fazer');
            const fazendo = document.getElementById('fazendo');
            const pronto = document.getElementById('pronto');

            aFazer.innerHTML = '';
            fazendo.innerHTML = '';
            pronto.innerHTML = '';

            tarefas.forEach((tarefa) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${tarefa.descricao}</h3>
                    <p><strong>Setor:</strong> ${tarefa.nome}</p>
                    <p><strong>Usuário:</strong> ${tarefa.id_usuario}</p>
                    <label><strong>Prioridade:</strong></label>
                    <select class="prioridade" data-id="${tarefa.id_tarefa}">
                        <option value="baixa" ${tarefa.prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
                        <option value="media" ${tarefa.prioridade === 'media' ? 'selected' : ''}>Média</option>
                        <option value="alta" ${tarefa.prioridade === 'alta' ? 'selected' : ''}>Alta</option>
                    </select>
                    <label><strong>Status:</strong></label>
                    <select class="status" data-id="${tarefa.id_tarefa}">
                        <option value="a_fazer" ${tarefa.status === 'a_fazer' ? 'selected' : ''}>A fazer</option>
                        <option value="fazendo" ${tarefa.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                        <option value="pronto" ${tarefa.status === 'pronto' ? 'selected' : ''}>Pronto</option>
                    </select>
                    <button onclick="excluir(${tarefa.id_tarefa})">Excluir</button>
                `;

                if (tarefa.status === 'a_fazer') {
                    aFazer.appendChild(card);
                } else if (tarefa.status === 'fazendo') {
                    fazendo.appendChild(card);
                } else if (tarefa.status === 'pronto') {
                    pronto.appendChild(card);
                }
            });

            document.querySelectorAll('.prioridade').forEach(select => {
                select.addEventListener('change', (e) => {
                    const id = e.target.dataset.id;
                    const novaPrioridade = e.target.value;
                    alterarPrioridade(id, novaPrioridade);
                });
            });

            document.querySelectorAll('.status').forEach(select => {
                select.addEventListener('change', (e) => {
                    const id = e.target.dataset.id;
                    const novoStatus = e.target.value;
                    alterarStatus(id, novoStatus);
                });
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            showMessage('Erro ao carregar tarefas. Verifique se o servidor está rodando na porta 2222.', 'error');
        });
}

function excluir(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 204) {
            showMessage('Tarefa excluída com sucesso', 'success');
            fetchTarefas();
        } else {
            showMessage('Erro ao excluir tarefa', 'error');
        }
    })
    .catch(error => {
        console.error('Erro ao excluir a tarefa:', error);
        showMessage('Erro ao excluir a tarefa.', 'error');
    });
}

function alterarStatus(id, novoStatus) {
    fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    })
    .then(response => {
        if (response.status === 200) {
            showMessage('Status da tarefa alterado com sucesso', 'success');
            fetchTarefas();
        } else {
            showMessage('Erro ao alterar status da tarefa', 'error');
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar o status da tarefa:', error);
        showMessage('Erro ao atualizar o status da tarefa.', 'error');
    });
}

function alterarPrioridade(id, novaPrioridade) {
    fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prioridade: novaPrioridade })
    })
    .then(response => {
        if (response.status === 200) {
            showMessage('Prioridade da tarefa alterada com sucesso', 'success');
            fetchTarefas();
        } else {
            showMessage('Erro ao alterar prioridade da tarefa', 'error');
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar a prioridade da tarefa:', error);
        showMessage('Erro ao atualizar a prioridade da tarefa.', 'error');
    });
}

fetchTarefas(); 