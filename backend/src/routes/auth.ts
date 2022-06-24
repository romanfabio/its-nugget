import { FastifyInstance } from "fastify";
import { login, me, register } from "../controllers/auth";

export default function(app: FastifyInstance) {

    app.route({
        method: 'GET',
        url: '/me',
        handler: me
    });

    app.route({
        method: 'POST',
        url: '/register',
        schema: {
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    'username': {type: 'string'},
                    'password': {type: 'string'}
                }   
            }
        },
        handler: register
    });

    app.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    'username': {type: 'string'},
                    'password': {type: 'string'}
                }   
            }
        },
        handler: login
    });
}