export interface BeltRequest {
    id: number,
    timestamp: string,
    speed?: number,
    consumption?: number
}

export type ANOMALY = "CONSUMPTION" | "SPEED";