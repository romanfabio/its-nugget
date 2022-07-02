import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ANOMALY, BeltRequest } from "../shared/types";
import { getAzureQueue, getMongo, getRedis } from "../shared/db";
import * as base64 from 'base-64';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<{ status: number }> {
    if (!isValidBody(req.body)) {
        return { status: 400 };
    }

    const body = req.body as BeltRequest;

    await insertMeasurement(body);

    await checkAnomalies(body);

    return { status: 200 };
};

function isValidBody(body: any): boolean {
    return body != undefined && body.id != undefined && body.timestamp != undefined &&
        (
            (body.speed == undefined && body.consumption != undefined) ||
            (body.speed != undefined && body.consumption == undefined) ||
            (body.speed != undefined && body.consumption != undefined))
}

async function insertMeasurement(body: BeltRequest): Promise<void> {

    const mongo = await getMongo();
    const collection = mongo.db(process.env['MONGO_DB']).collection(process.env['MONGO_DATA_COLLECTION']);

    const dto: any = { belt: body.id, timestamp: new Date(body.timestamp) };
    if (body.speed != undefined)
        dto.speed = body.speed;
    if (body.consumption != undefined)
        dto.consumption = body.consumption;

    await collection.insertOne(dto);
}

async function checkAnomalies(body: BeltRequest): Promise<void> {
    await checkConsumptionAnomaly(body);
    await checkSpeedAnomaly(body);
}

async function checkSpeedAnomaly(body: BeltRequest): Promise<void> {
    if (body.speed == undefined)
        return;

    const redis = await getRedis();
    const time = await redis.get(`${body.id}`);
    if (time == null) {
        if (body.speed > parseFloat(process.env['SPEED_THRESHOLD'])) {
            await redis.set(`${body.id}`, `${Number(new Date(body.timestamp))}`);
        }
    } else {
        if (body.speed > parseFloat(process.env['SPEED_THRESHOLD'])) {
            const diff = Number(new Date(body.timestamp)) - Number(time);
            if (diff > parseInt(process.env['SPEED_TIME_THRESHOLD'])) {
                const anomaly: ANOMALY = "SPEED";
                const dto = {
                    belt: body.id,
                    type: anomaly,
                    since: new Date(Number(time)).toISOString()
                }

                const queue = getAzureQueue();
                const enc = base64.encode(JSON.stringify(dto));
                await queue.sendMessage(enc);
            }
        }
        else {
            await redis.del(`${body.id}`);
        }
    }
}

async function checkConsumptionAnomaly(body: BeltRequest): Promise<void> {
    if (body.consumption == undefined || body.consumption <= parseFloat(process.env['CONSUMPTION_THRESHOLD']))
        return;

    const anomaly: ANOMALY = "CONSUMPTION";

    const dto = {
        belt: body.id,
        timestamp: new Date(body.timestamp).toISOString(),
        type: anomaly,
        value: body.consumption
    }

    const queue = getAzureQueue();
    const enc = base64.encode(JSON.stringify(dto));
    await queue.sendMessage(enc);
}

export default httpTrigger;