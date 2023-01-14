export type BusStop = {
    "line": number,
    "stop": string,
    "order": number,
    "time": string
}

export type MappedStop = BusStop["stop"];

export enum Sort {
    'ASC' = 'ASC',
    'DESC' = 'DESC'
}
