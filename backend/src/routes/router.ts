import { FastifyInstance } from "fastify"
import useAuthRoutes from './auth';

export default function(app: FastifyInstance, opts: unknown, next: any) {
    
    useAuthRoutes(app);

    next();
}