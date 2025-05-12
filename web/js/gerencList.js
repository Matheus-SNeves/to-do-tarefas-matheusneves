function fetchTarefas() {
    fetch('http://localhost:2222/tarefas')
        .then(response => response.json())
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
                    <label for="prioridade"><strong>Prioridade:</strong></label>
            <select id="prioridade" aria-selected="true">
                <option value="">Selecione</option>   
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>
            <p></p>
            <label for="status"><strong>Status:</strong></label>
            <select id="status">
                <option value="">Selecione</option>
                <option value="a_fazer">A fazer</option>
                <option value="fazendo">Fazendo</option>
                <option value="pronto">Pronto</option>
            </select>
                        <p></p>

                    <button onclick="excluir(${tarefa.id})">Excluir</button>
                    <button onclick="alterarStatus(${tarefa.id}, '${tarefa.status}')">Alterar Status</button>
                `;

                // Adiciona o card na coluna correspondente com base no status
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
            alert('Erro ao carregar tarefas');
            console.error(error);
        });
}

function excluir(id) {
    fetch(`http://localhost:2222/tarefas/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.status)
    .then(status => {
        if (status === 204) {
            alert('Tarefa excluída com sucesso');
            fetchTarefas(); 
        } else {
            alert('Erro ao excluir tarefa');
        }
    });
}

function alterarStatus(id, statusAtual) {
    const novoStatus = statusAtual === 'a_fazer' ? 'fazendo' : statusAtual === 'fazendo' ? 'pronto' : 'a_fazer';
    fetch(`http://localhost:2222/tarefas/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    })
    .then(response => response.status)
    .then(status => {
        if (status === 200) {
            alert('Status da tarefa alterado com sucesso');
            fetchTarefas(); 
        } else {
            alert('Erro ao alterar status da tarefa');
        }
    });
}

fetchTarefas();
