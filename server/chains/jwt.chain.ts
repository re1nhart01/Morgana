import {BaseChain} from "../internal/core/base.chain";
import * as jwt from 'jsonwebtoken';
import {TOKENS} from "../internal/types";
import {chainTool} from "../internal/core/index.chain";




export class JwtChain extends BaseChain<typeof jwt>{
    constructor() {
        super(jwt)
    }

    public get privateKey(): string {
        return this.usings.fs.readFileSync(this.usings.path.join(__dirname, "../https/", 'server.key'), {encoding: "utf8"})
    }

    public get algs(): {refresh:  jwt.Algorithm, access:  jwt.Algorithm} {
        return {
            refresh: "RS256",
            access: "RS384",
        }
    }


    public async validateRefreshJWT(token: string) {
       try {
           const decoded = jwt.verify(token, this.privateKey, {algorithms: [this.algs.refresh], })
           if (typeof decoded !== 'string' && decoded.exp === void 0) {
               return false
           }
           return true
       } catch (e) {
           console.log(e)
           return false
       }
    }

    public async validateAccessJWT(token: string): Promise<{ userHash: string, iat: number }> {
        try {
            const decoded = jwt.verify(token, this.privateKey, {algorithms: [this.algs.access], })
            return decoded as {userHash: string, iat: number}
        } catch (e) {
            console.log('validateAccessJWT ex', e)
            return null
        }
    }

    public async createJWTS(data: object): Promise<TOKENS> {
        try {
            const key = this.privateKey;
            console.log(data, key)
            const access_token = this.lib.sign(data, key, {
                    algorithm: this.algs.access,
            })
            const refresh_token = this.lib.sign(data, key, {
                algorithm: this.algs.refresh,
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