import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;

    const {rows} = await server.pg.query('SELECT id, alias FROM plants');

    return {
        values: rows
    };
}