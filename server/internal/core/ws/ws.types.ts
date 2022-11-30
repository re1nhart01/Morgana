import WebSocket from "ws";

export interface WSEvent {
    event: string;
    data: any;
}


export interface WSOnEmitter {
    event: WSEvent;
    clients: Array<WebSocket>
    current: WebSocket;
}


export interface WSSettings {
        path: string;
        port: number;
        config: any;
        emitter: EmitterCallback;
        key: string
}


export type EmitterCallback = (data: WSEvent, clientList: Array<WebSocket>, currentClient: WebSocket) => void;
