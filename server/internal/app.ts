import {useAllModels, useAllRoutes, useAllThreads} from "./utilities";
import {ModelTree} from "./types";



const path = require('path')
const fs = require("fs");
const PORT = +process.env.PORT! || 3000;
const express = require('express');
const https = require("https");


export abstract class CoreApplication {
    protected abstract get controllers(): any[];
    protected abstract usings(): void;
    protected abstract get runOnOtherThread(): {path: string; data: any}[];
    protected abstract get useGlobalURLPath(): string | null;
    protected abstract get modelsTree(): ModelTree;
    protected abstract preStart(): void;
    private readonly _port: number | null;
    private readonly _application: any;
    private readonly _isHttps: boolean;
    protected constructor(PORT: number, HTTPS: boolean) {
        this._port = PORT;
        this._application = express();
        this._isHttps = HTTPS;
    }

    private beforeStart = async () => {
        try {
            await this.usings()
            await require('../db/database').createDatabaseConnection()
            await useAllRoutes(this._application, this.controllers, this.useGlobalURLPath)
            await useAllModels(this.modelsTree)
            await this.preStart()
        } catch (e) {
            console.log('beforeStart ex ', e)
        }
    }

    private afterStart = async () => {
        try {
            await useAllThreads(this.runOnOtherThread)
        } catch (e) {
            console.log('afterStart ex ', e)
        }
    }


    private runnable = async () => {
        await this.afterStart()
        console.log(`[server]: Server is running at ${this._isHttps ? 'https' : 'http'}://localhost:${this._port}`);
    }

    public async run() {
        try {
            await this.beforeStart()
            this.appInstance.listen(this._port, this.runnable)
        } catch (ex) {
            console.log('Error on server running!', ex)
        }
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

    private get httpServer() {
        return this._application;
    }

}
