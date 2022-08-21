import {JwtChain} from "../../chains/jwt.chain";
import {ConstantsChain} from "../../chains/constants.chain";
import {CryptoChain} from "../../chains/crypto.chain";

export const chainTool = {
    jwt: new JwtChain(),
    constants: new ConstantsChain(),
    crypto: new CryptoChain()
}