import { FastifyReply, FastifyRequest } from "fastify";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface RegisterRequestBody {
    username: string,
    password: string,
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;
    const body = request.body as RegisterRequestBody;

    const hash = await bcrypt.hash(body.password, 10);

    await server.pg.query('INSERT INTO users (username, password) VALUES ($1,$2)', [body.username, hash]);

    const token = jwt.sign({user: body.username}, process.env['SECRET_KEY'] as string);

    return {token};
}

interface LoginRequestBody {
    username: string,
    password: string,
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
    const server = request.server;
    const body = request.body as LoginRequestBody;

    const {rows} = await server.pg.query('SELECT password FROM users WHERE username = $1', [body.username]);
    if(rows.length == 0) {
        reply.code(401);
        return;
    }
    const hash = rows[0].password;
    
    if(! (await bcrypt.compare(body.password, hash))) {
        reply.code(401);
        return;
    }

    const token = jwt.sign({user: body.username}, process.env['SECRET_KEY'] as string);

    return {token};
}

export async function me(request: FastifyRequest, reply: FastifyReply) {
    return {user: request.user};
}