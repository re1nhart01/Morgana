import WebSocket, { WebSocketServer } from 'ws';
import {chainTool} from "../index.chain";
import {EmitterCallback, WSEvent, WSSettings} from "./ws.types";
import {isValidJSON} from "../helpers";


class SocketInstance {
    private _connection: WebSocketServer;
    private readonly _keyOfSocket: string;
    private readonly _settings: WSSettings;
    constructor({key, emitter, config, path, port}: WSSettings) {
        this._connection = this.createSocket(path, port, config, emitter)
        this._settings = {
            path,
            port,
            emitter,
            config,
            key
        }
        console.log(this._settings)
        this._keyOfSocket = key;
    }

    //TODO: type config
    private createSocket(path: string, port: number, config: any, emitter: EmitterCallback) {
        const newSocket = new WebSocketServer({
                path: path,
                port: port || +chainTool.constants.processConstants.MAIN_SOCKET_PORT || 3322,
                perMessageDeflate: {
                    zlibDeflateOptions: {
                        chunkSize: 1024,
                        memLevel: 7,
                        level: 3
                    },
                    zlibInflateOptions: {
                        chunkSize: 10 * 1024
                    },
                    // Other options settable:
                    clientNoContextTakeover: true,
                    serverNoContextTakeover: true,
                    serverMaxWindowBits: 10,
                    concurrencyLimit: 10,
                    threshold: 2048
                }
            }
        , () => {
            console.log('socket is running on port', port)
            })
        if (newSocket) {
            newSocket.on('error', this.onError)
            newSocket.on('close', this.onClose)
            newSocket.on('connection', this.onConnection(path, port, emitter))
        }
        return newSocket;
    }

    private restartSocket(retry: number = 3) {
        try {
            const {path, port, config, emitter} = this._settings;
            this._connection = this.createSocket(path, port, config, emitter)
        } catch (e) {
            sleep(2000);
            this.restartSocket(retry--)
            console.log('error on restart socket!', e)
        }
    }


    private onClose(errorMessage: string) {
        console.log('socket close with message:', errorMessage)
    }

    private onError(errorMessage: string) {
        console.log('error on socket connection:', errorMessage)
        this.restartSocket()
    }

    private onConnection(path: string, port: number, emitter: EmitterCallback) {
       return (client) => {
           console.log('new client connected on path', path)
           client.on('message', (data) => {
               const json = isValidJSON(data)
               emitter(json, Array.from(this.connection.clients), client)
           })
           client.send(`socket connected on port: ${port} and path ${path}`)
       }
    }

    public get settings(): WSSettings {
        return this._settings;
    }

    public get keyOfSocket(): string {
        return this._keyOfSocket;
    }


    public get connection(): WebSocket.WebSocketServer {
        return this._connection;
    }
}


const sleep = (timer: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timer)
    })
}


export {SocketInstance}
