import {BaseChain} from "../internal/core/base.chain";
import crypto from "crypto";
class CryptoChain extends BaseChain<typeof crypto> {
    constructor() {
        super(crypto);
    }
    public generateShaHash() {}

    public hashString = async (string: string) => {
       const rounds = 6;
       return await this.usings.bcrypt.hash(string, rounds)
    }

    public compareHashes = async (string: string, hash: string): Promise<null | boolean> => {
        if (string === void 0 || string === null) {
            return null;
        }
        return await this.usings.bcrypt.compare(string, hash);
    }

    public get usings() {
        return {
            bcrypt: require('bcrypt')
        };
    }

}


export {CryptoChain}