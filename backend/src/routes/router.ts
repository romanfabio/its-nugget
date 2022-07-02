import { FastifyInstance } from "fastify"
import useAuthRoutes from './auth'
import usePlantRoutes from './plant'
import useSectionRoutes from './section'
import useBeltRoutes from './belt'
import useDataRoutes from './data'

export default function(app: FastifyInstance, opts: unknown, next: any) {
    
    useAuthRoutes(app);

    usePlantRoutes(app);

    useSectionRoutes(app);

    useBeltRoutes(app);

    useDataRoutes(app);

    next();
}