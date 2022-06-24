import 'dotenv/config'
import fastify, { FastifyInstance } from "fastify";
import addRoutes from './src/routes/router';
import authMiddle from './src/middlewares/auth';

import pg from 'pg';
import * as mongodb from 'mongodb';
import * as redis from 'redis';
declare module 'fastify' {
    interface FastifyInstance {
        pg: pg.Client,
        mongo: mongodb.MongoClient,
        redis: redis.RedisClientType        
    }
    interface FastifyRequest {
        user?: string
    }
}

const app = fastify({logger: process.env.DEBUG != undefined});

app.register(addRoutes, {prefix: 'api'});

app.addHook('preValidation', authMiddle);

const start = async () => {
    try {

        await usePostgres(app);

        await useMongo(app);

        await useRedis(app);

        await app.listen({port: parseInt(process.env.PORT as string)});
    } catch(x) {
        app.log.error(x);
        process.exit(1);
    }
}

async function usePostgres(app: FastifyInstance) {
    const conn = new pg.Client({
        connectionString: process.env['POSTGRES_CONN_STRING'],
    });

    app.log.info('Connecting to postgres server...');
    await conn.connect();
    
    app.decorate('pg', conn);
    app.log.info('Connected to postgres server.');

}

async function useMongo(app: FastifyInstance) {
    const conn = new mongodb.MongoClient(process.env['MONGO_CONN_STRING'] as string);

    app.log.info('Connecting to mongo server...');
    await conn.connect();

    app.decorate('mongo', conn);
    app.log.info('Connected to mongo server.');
}

async function useRedis(app: FastifyInstance) {
    const conn = redis.createClient({
        url: process.env['REDIS_CONN_STRING'],
        password: process.env['REDIS_PASSWORD']
    });

    app.log.info('Connecting to redis server...');
    await conn.connect();

    app.decorate('redis', conn);
    app.log.info('Connected to redis server.');
}

start();