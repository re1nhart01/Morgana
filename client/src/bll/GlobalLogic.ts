import {CurrentUser} from "./CurrentUser";
import {ServerSettings} from "./ServerSettings";
import {Validators} from "./Validators";
import {Socket} from "./Socket";


export class GlobalLogic {
    private readonly _user: CurrentUser;
    private readonly _api: ServerSettings;
    private readonly _validators: Validators;
    private readonly _socket: Socket;
    constructor() {
        this._user = new CurrentUser();
        this._api = new ServerSettings();
        this._validators = new Validators()
        this._socket = new Socket();
    }

    public get socket(): Socket {
        return this._socket;
    }

    public get api(): ServerSettings {
        return this._api;
    }

    public get validators(): Validators {
        return this._validators;
    }

    public get User(): CurrentUser {
        return this._user;
    }
}

export const application = new GlobalLogic();
window.__app__ = application;