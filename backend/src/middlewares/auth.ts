import { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from 'jsonwebtoken';

export default async function(request: FastifyRequest, reply: FastifyReply) {
    if(request.url.endsWith("/login") || request.url.endsWith("/register") || (!request.url.includes("/api/")))
        return;

    const server = request.server;

    let token = request.headers.authorization;
    if(!token || !token.toLowerCase().startsWith("bearer ")) {
        reply.code(401);
        throw "unauthorized";
    }
    token = token.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env['SECRET_KEY'] as string);
        request.user = (decode as any).user;
    } catch(x) {
        server.log.error(x);
        reply.code(401);
        throw "unauthorized";
    }
}