import cors = require("cors");
import express = require("express");
import {AuthController} from "./controllers/auth.controller";
const path = require("path")
import {UsersController} from "./controllers/users.controller";
import { CoreApplication } from "./internal/app";
import {ModelTree, threadRunner} from "./internal/types";
import {chainTool} from "./internal/core/index.chain";
import {SocketInstance} from "./internal/core/ws/instance.socket";
import {SocketEmitter} from "./internal/core/ws/socket.emitter";
const User = require("./models/UserModel")

class Application extends CoreApplication {
    constructor(PORT: number, HTTPS: boolean) {
        super(PORT, HTTPS)
    }

    protected preStart(): void {
        new SocketInstance({key: 'aboba', port: 5454, path: '/qwerty21', emitter: SocketEmitter.emitterMain, config: {}})
    }

    protected get modelsTree(): ModelTree {
        return [];
    }

    protected get runOnOtherThread(): threadRunner[] {
        return [{
            path: path.join(__dirname, "rtc/", "peer.ts"),
            data: {RTC_PORT: chainTool.constants.processConstants.RTC_PEER_PORT}
        }];
    }

    protected get corsOptions(): cors.CorsOptions {
        return {}
    }

    protected get useGlobalURLPath(): string {
        return "/api";
    }

    protected usings(): void {
       this.appInstance.use(express.json())
       this.appInstance.use(cors(this.corsOptions))
    }

    protected get controllers(): any {
        return [UsersController, AuthController]
    }
}

export { Application }

