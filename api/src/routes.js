const express = require('express');
const routes = express.Router();

const usuario = require('./controllers/usuario');
const tarefa = require('./controllers/tarefa');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'TO-DO LISTAAA ON' });
});

routes.post('/usuarios', usuario.create);
routes.get('/usuarios', usuario.read);
routes.get('/usuarios/:id', usuario.readOne);
routes.put('/usuarios/:id', usuario.update);
routes.delete('/usuarios/:id', usuario.remove);

routes.post('/tarefas', tarefa.create);
routes.get('/tarefas', tarefa.read);
routes.get('/tarefas/:id', tarefa.readOne);
routes.put('/tarefas/:id', tarefa.update);
routes.delete('/tarefas/:id', tarefa.remove);

module.exports = routes;