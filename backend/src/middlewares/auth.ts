import { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from 'jsonwebtoken';

export default async function(request: FastifyRequest, reply: FastifyReply) {
    if(request.url.endsWith("/login") || request.url.endsWith("/register"))
        return;

    const server = request.server;

    const token = request.headers.authorization;
    if(!token) {
        reply.code(401);
        throw "unauthorized";
    }

    try {
        const decode = jwt.verify(token, process.env['SECRET_KEY'] as string);
        request.user = (decode as any).user;
    } catch(x) {
        server.log.error(x);
        reply.code(401);
        throw "unauthorized";
    }
}