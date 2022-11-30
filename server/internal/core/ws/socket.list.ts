import {SocketInstance} from "./instance.socket";
import {WSSettings} from "./ws.types";


class SocketList {
    private mainSocket: SocketInstance;
    private readonly anySocketList: Array<SocketInstance>;
    constructor() {
        this.anySocketList = [];
    }

    public async add(instance: { new(settings: WSSettings): SocketInstance }, isMain: boolean, args: WSSettings) {
        try {
            const newInstance = new instance(args)
            if (isMain) {
                this.mainSocket = newInstance;
            } else {
                this.anySocketList.push(newInstance)
            }
        } catch (e) {

        }
    }

    public async remove(key, closeMessage: string) {
        const findableSocketIndex = this.anySocketList.findIndex((socket) => socket.keyOfSocket === key)
        if (findableSocketIndex !== -1) {
            this.anySocketList[findableSocketIndex].connection.close()
            this.anySocketList.splice(findableSocketIndex, 1);
        }
    }
}

export const socketList = new SocketList();
