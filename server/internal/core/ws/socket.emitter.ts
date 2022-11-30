import WebSocket from "ws";
import {WSEvent} from "./ws.types";

class SocketEmitter {
    constructor() {
    }

    public static async emitterMain(data: WSEvent, clientList: Array<WebSocket>, currentClient: WebSocket): Promise<void> {
        switch (data.event) {
            case 'bebra':
                console.log('bebra')
                this.sendExceptCurrent(currentClient, clientList, data.data)
                break;
            default:
                console.log('emitterMain.default', data)
        }
    }


    private static sendExceptCurrent = (currentClient: WebSocket, list: Array<WebSocket>, dataToSend: any) => {
        for (let client of list) {
            if (client !== currentClient) {
                client.send(dataToSend)
            }
        }
    }

}


export {SocketEmitter}
