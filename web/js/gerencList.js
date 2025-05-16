function fetchTarefas() {
    fetch('http://localhost:2222/tarefas')
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
                console.log(tarefa)
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
        <p><strong>Setor:</strong> ${tarefa.nome}</p>
        <p><strong>Usuário:</strong> ${tarefa.id_usuario}</p>
        <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
            <label><strong>Prioridade:</strong></label>
            <select class="prioridade" aria-selected="true">
                <option value="${tarefa.prioridade}" selected>${tarefa.prioridade}</option>   
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>
            <p></p>
            <label><strong>Status:</strong></label>
            <select class="status" onchange="atualizarStatus(${tarefa.id_tarefa}, this.value)">
                <option value="${tarefa.status}" selected>${tarefa.status}</option>
                <option value="a_fazer">A fazer</option>
                <option value="fazendo">Fazendo</option>
                <option value="pronto">Pronto</option>
            </select>
            <p></p>
        <button onclick="excluir(${tarefa.id_tarefa})">Excluir</button>
        <button onclick="editar(${tarefa.id_tarefa})">Editar</button>
                <button onclick="atualizarStatus(${tarefa.id_tarefa})">Atualizar Status</button>

    `;


                if (tarefa.status === 'a_fazer') {
                    aFazer.appendChild(card);
                } else if (tarefa.status === 'fazendo') {
                    fazendo.appendChild(card);
                } else if (tarefa.status === 'pronto') {
                    pronto.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function excluir(id) {
    fetch(`http://localhost:2222/tarefas/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 204) {
                alert('Tarefa excluída com sucesso');
                fetchTarefas();
            } else {
                alert('Erro ao excluir tarefa');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir a tarefa:', error);
        });
}

function atualizarStatus(id, novoStatus) {
    fetch(`http://localhost:2222/tarefas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    })
        .then(response => {
            if (response.status === 200) {
                alert('Status da tarefa alterado com sucesso');
                fetchTarefas();
            } else {
                alert('Erro ao alterar status da tarefa');
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o status da tarefa:', error);
        });
}

function editar(id) {
    window.location.href = `cadastroList.html?id=${id}`;
}

fetchTarefas();
