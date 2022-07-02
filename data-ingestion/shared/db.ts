import * as azure from '@azure/storage-queue';
import * as mongo from 'mongodb';
import * as redis from 'redis';

let azureQueuePool : azure.QueueServiceClient = undefined;
let mongoPool : mongo.MongoClient = undefined;
let redisPool : redis.RedisClientType = undefined;

export function getAzureQueue() : azure.QueueClient {
        
    if(!azureQueuePool)
        azureQueuePool = azure.QueueServiceClient.fromConnectionString(process.env['AZURE_QUEUE_CONN_STRING']);
    return azureQueuePool.getQueueClient(process.env['AZURE_QUEUE_ANOMALIES_NAME']);
}

export async function getRedis() {
    if(redisPool)
        return redisPool;
    
    redisPool = redis.createClient({
            url: process.env['REDIS_CONN_STRING'],
            password: process.env['REDIS_PASSWORD']
    });
    
    try {
        await redisPool.connect();
    } catch(x) {
        redisPool = undefined;
        throw x;
    }

    return redisPool;
}

export async function getMongo() : Promise<mongo.MongoClient> {
    if(mongoPool)
        return mongoPool;

    mongoPool = new mongo.MongoClient(process.env['MONGO_CONN_STRING']);
    try {
        await mongoPool.connect();
    } catch(x) {
        mongoPool = undefined;
        throw x;
    }

    return mongoPool;
}