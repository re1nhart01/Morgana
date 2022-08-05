import {BaseChain} from "./base.chain";
import * as jwt from 'jsonwebtoken';
import {TOKENS} from "../internal/types";
import {chainTool} from "./index.chain";




export class JwtChain extends BaseChain<typeof jwt>{
    constructor() {
        super(jwt)
    }

    public get privateKey(): string {
        return this.usings.fs.readFileSync(this.usings.path.join(__dirname, "../https/", 'server.key'), {encoding: "utf8"})
    }

    public async createJWTS(data: object): Promise<TOKENS> {
        try {
            const key = this.privateKey;
            console.log(data, key)
            const access_token = this.lib.sign(data, key, {
                algorithm: "RS384",
            })
            const refresh_token = this.lib.sign(data, key, {
                algorithm: "RS256",
                expiresIn: '30d'
            })
            return {
                access_token: access_token,
                refresh_token: refresh_token,
            }
        } catch (e) {
            console.log('createJWTS ex', e)
            return {
                access_token: "",
                refresh_token: ""
            }
        }
    }

    get usings() {
        return {
            fs: require('fs'),
            path: require('path',)
        };
    }
}