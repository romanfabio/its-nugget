import { FastifyInstance } from "fastify";
import { getAll } from "../controllers/plant";

export default function(app: FastifyInstance) {

    app.route({
        method: 'GET',
        url: '/plant/all',
        handler: getAll
    });
}