import { FastifyInstance } from "fastify";
import { getAllData, getSpeedData, getConsumptionData } from "../controllers/data";

export default function(app: FastifyInstance) {

    app.route({
        method: 'POST',
        url: '/data/all',
        handler: getAllData,
        schema: {
            body: {
                type: 'object',
                required: ['belt', 'from'],
                properties: {
                    belt: {type: 'integer'},
                    from: {type: 'string'},
                    to: {type: 'string'}
                }
            }
        }
    });

    app.route({
        method: 'POST',
        url: '/data/speed',
        handler: getSpeedData,
        schema: {
            body: {
                type: 'object',
                required: ['belt', 'from'],
                properties: {
                    belt: {type: 'integer'},
                    from: {type: 'string'},
                    to: {type: 'string'}
                }
            }
        }
    });

    app.route({
        method: 'POST',
        url: '/data/consumption',
        handler: getConsumptionData,
        schema: {
            body: {
                type: 'object',
                required: ['belt', 'from'],
                properties: {
                    belt: {type: 'integer'},
                    from: {type: 'string'},
                    to: {type: 'string'}
                }
            }
        }
    });
}