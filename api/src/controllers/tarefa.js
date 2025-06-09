const { PrismaClient } = require('../../generated/prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.create({
            data: req.body
        });
        return res.status(201).json(tarefa);
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany();
        return res.json(tarefas);
    } catch (error) {
        console.error("Erro ao ler tarefas:", error);
        return res.status(500).json({ error: error.message });
    }
}

const readOne = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.findUnique({
            select: {
                id_tarefa: true,
                nome: true,
                descricao: true,
                id_usuario: true,
                prioridade: true,
                status: true,
                usuario: true
            },
            where: {
                id_tarefa: Number(req.params.id)
            }
        });
        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }
        return res.json(tarefa);
    } catch (error) {
        console.error("Erro ao ler uma tarefa específica:", error);
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.update({
            where: {
                id_tarefa: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(200).json(tarefa);
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Tarefa não encontrada para atualização." });
        }
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.tarefa.delete({
            where: {
                id_tarefa: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        console.error("Erro ao remover tarefa:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Tarefa não encontrada para exclusão." });
        }
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };