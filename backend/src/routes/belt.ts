import { FastifyInstance } from "fastify";
import { getAll } from "../controllers/belt";

export default function(app: FastifyInstance) {

    app.route({
        method: 'GET',
        url: '/belt/all',
        handler: getAll,
        schema: {
            querystring: {
                'section' : {type:'string'}
            }
        }
    });
}