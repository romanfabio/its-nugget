import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;
    const sectionId = (request.query as any).section as string;

    let result;

    if(sectionId)
        result = await server.pg.query('SELECT id, alias FROM belts WHERE section_id = $1', [sectionId]);
    else
        result = await server.pg.query('SELECT id, alias FROM belts');

    const {rows} = result;

    return {
        values: rows
    };
}