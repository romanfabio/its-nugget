import { FastifyReply, FastifyRequest } from "fastify";

interface GetAllDataRequestBody {
    belt: number,
    from: string,
    to?: string
}

export async function getAllData(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;
    const body = request.body as GetAllDataRequestBody;

    const belt = body.belt;
    const from = new Date(body.from);
    const to = body.to?new Date(body.to) : new Date();

    const {rows} = await server.pg.query('SELECT id FROM belts WHERE id = $1', [belt]);
    if(rows.length == 0) {
        reply.code(400);
        return;
    }

    const collection = server.mongo.db(process.env['MONGO_DB']).collection(process.env['MONGO_DATA_COLLECTION'] as string);
    const data = await collection.find({belt: belt, timestamp: {$gte: from, $lt: to}})
        .sort({timestamp: 1})
        .project({timestamp: 1, speed: 1, consumption: 1, _id: 0})
        .toArray();

    return {
        values: data
    };
}

export async function getSpeedData(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;
    const body = request.body as GetAllDataRequestBody;

    const belt = body.belt;
    const from = new Date(body.from);
    const to = body.to?new Date(body.to) : new Date();

    const {rows} = await server.pg.query('SELECT id FROM belts WHERE id = $1', [belt]);
    if(rows.length == 0) {
        reply.code(400);
        return;
    }

    const collection = server.mongo.db(process.env['MONGO_DB']).collection(process.env['MONGO_DATA_COLLECTION'] as string);
    const data = await collection.find({belt: belt, timestamp: {$gte: from, $lt: to}, speed: {$exists: true}})
        .sort({timestamp: 1})
        .project({timestamp: 1, speed: 1, _id: 0}).toArray();

    return {
        values: data
    };
}

export async function getConsumptionData(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;
    const body = request.body as GetAllDataRequestBody;

    const belt = body.belt;
    const from = new Date(body.from);
    const to = body.to?new Date(body.to) : new Date();

    const {rows} = await server.pg.query('SELECT id FROM belts WHERE id = $1', [belt]);
    if(rows.length == 0) {
        reply.code(400);
        return;
    }

    const collection = server.mongo.db(process.env['MONGO_DB']).collection(process.env['MONGO_DATA_COLLECTION'] as string);
    const data = await collection.find({belt: belt, timestamp: {$gte: from, $lt: to}, consumption: {$exists: true}})
        .sort({timestamp: 1})
        .project({timestamp: 1, consumption: 1, _id: 0}).toArray();

    return {
        values: data
    };
}