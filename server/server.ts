import cors = require("cors");
import express = require("express");
import {AuthController} from "./controllers/auth.controller";
const path = require("path")
import {UsersController} from "./controllers/users.controller";
import { MorganaApplication } from "./internal/app";
import {threadRunner} from "./internal/types";
import {chainTool} from "./internal/core/index.chain";
const User = require("./models/UserModel")

class Application extends MorganaApplication {
    constructor(PORT: number, HTTPS: boolean) {
       super(PORT, HTTPS)
    }

    public get models(): any[] {
        return [User];
    }

    public get runOnOtherThread(): threadRunner[] {
        return [{
            path: path.join(__dirname, "rtc/", "peer.ts"),
            data: {RTC_PORT: chainTool.constants.processConstants.RTC_PEER_PORT}
        }];
    }

    private get corsOptions(): cors.CorsOptions {
        return {}
    }

    get useGlobalURLPath(): string {
        return "/api";
    }

    usings(): void {
       this.appInstance.use(express.json())
       this.appInstance.use(cors(this.corsOptions))
    }

    public get controllers(): any {
        return [UsersController, AuthController]
    }
}

export { Application }

