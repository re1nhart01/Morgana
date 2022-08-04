

export class ServerSettings {
    private readonly _API_URL: string;
    private readonly API: string;
    private readonly PORT: string;
    private readonly _isHTTPS: boolean;
    constructor() {
        this.PORT = '8080'
        this.API = `localhost:${this.PORT}`
        this._API_URL = `${this.protocol}://${this.API}/api/`
        this._isHTTPS = false;

    }

    public get API_URL(): string {
        return this._API_URL;
    }

    public get isHTTPS(): boolean {
        return this._isHTTPS;
    }

    public get protocol() {
        return this.isHTTPS ? 'https': 'http'
    }
}