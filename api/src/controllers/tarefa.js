const { PrismaClient } = require('../../generated/prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.create({
            data: req.body
        });
        return res.status(201).json(tarefa);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const tarefas = await prisma.tarefa.findMany();
    return res.json(tarefas);
}

const readOne = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.findUnique({
            select: {
                id_tarefa: true,
                nome: true,
                descricao: true,
                id_usuario:true,
                prioridade:true,
                status:true,    
                usuario:true
            },
            where: {
                id_tarefa: Number(req.params.id)
            }
        });
        return res.json(tarefa);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(tarefa);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.tarefa.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };