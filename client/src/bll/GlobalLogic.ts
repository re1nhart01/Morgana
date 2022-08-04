import {CurrentUser} from "./CurrentUser";
import {ServerSettings} from "./ServerSettings";


export class GlobalLogic {
    private readonly _user: CurrentUser;
    private readonly _api: ServerSettings;
    constructor() {
        this._user = new CurrentUser();
        this._api = new ServerSettings();
    }

    public get api(): ServerSettings {
        return this._api;
    }

    public get User(): CurrentUser {
        return this._user;
    }
}

export const application = new GlobalLogic();
window.__app__ = application;