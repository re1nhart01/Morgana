import express = require("express");
import {AuthController} from "./controllers/auth.controller";

require('dotenv').config({path: require('path').join(__dirname, 'env', '.env')})
import {UsersController} from "./controllers/users.controller";
import { MorganaApplication } from "./internal/app";
import {UserModel} from "./models/UserModel";


class Application extends MorganaApplication {
    constructor(PORT: number, HTTPS: boolean) {
       super(PORT, HTTPS)
    }

    public get models(): any[] {
        return [UserModel];
    }

    usings(): void {
       this.appInstance.use(express.json())
    }

    public get controllers(): any {
        return [UsersController, AuthController]
    }
}

export { Application }
