import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;
    const plantId = (request.query as any).plant as string;

    let result;

    if(plantId)
        result = await server.pg.query('SELECT id, alias FROM sections WHERE plant_id = $1', [plantId]);
    else
        result = await server.pg.query('SELECT id, alias FROM sections');

    const {rows} = result;

    return {
        values: rows
    };
}