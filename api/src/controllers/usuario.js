const { PrismaClient } = require('../../generated/prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const usuario = await prisma.usuario.create({
            data: req.body
        });
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    return res.json(usuarios);
}

const readOne = async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            select: {
                id_usuario: true,
                nome: true,
                email: true,
                tarefas: true
            },
            where: {
                id_usuario: Number(req.params.id)
            }
        });
        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const usuario = await prisma.usuario.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(usuario);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.usuario.delete({
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