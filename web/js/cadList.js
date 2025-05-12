//Enviar os dados do formulário para o servidor
const form = document.getElementById('forms');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        descricao: form.descricao.value,
        nome: form.nome.value,
        id_usuario: Number(form.usuario.value),
        prioridade: form.prioridade.value,
        status: form.status.value
        }
    fetch('http://localhost:2222/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                alert('Tarefa cadastrado com sucesso');
            } else {
                alert('Erro ao cadastrar tarefa');
            }
        });
});

