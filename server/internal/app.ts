import {useAllModels, useAllRoutes} from "./utilities";
import {UsersController} from "../controllers/users.controller";

const path = require('path')
const fs = require("fs");
const PORT = +process.env.PORT! || 3000;
const express = require('express');
const https = require("https");


export abstract class MorganaApplication {
    private readonly _port: number | null;
    private readonly _application: any;
    private readonly _isHttps: boolean;
    protected constructor(PORT: number, HTTPS: boolean) {
        this._port = PORT;
        this._application = express();
        this._isHttps = HTTPS;
    }
    private get httpsServer() {
        return https
            .createServer(
                {
                    key: fs.readFileSync(path.join(__dirname, 'https', 'server.key')),
                    cert: fs.readFileSync(path.join(__dirname, 'https', 'server.cert')),
                },
                this._application
            )
    }

    public get appInstance() {
        return this._isHttps ? this.httpsServer : this.httpServer;
    }

    public abstract get controllers(): any[];
    public abstract get models(): any[];
    public abstract usings(): void;

    public async run() {
        try {
            await this.usings()
            require('../db/database')
            useAllRoutes(this._application, this.controllers)
            useAllModels(this.models)
            this.appInstance.listen(this._port, () => {
                console.log(`[server]: Server is running at ${this._isHttps ? 'https' : 'http'}://localhost:${this._port}`);
            })
        } catch (ex) {
            console.log('Error on server running!', ex)
        }
    }

    private get httpServer() {
        return this._application;
    }

}