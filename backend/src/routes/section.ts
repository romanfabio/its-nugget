import { FastifyInstance } from "fastify";
import { getAll } from "../controllers/section";

export default function(app: FastifyInstance) {

    app.route({
        method: 'GET',
        url: '/section/all',
        handler: getAll,
        schema: {
            querystring: {
                'plant' : {type:'string'}
            }
        }
    });
}