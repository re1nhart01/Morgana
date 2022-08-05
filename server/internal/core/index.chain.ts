import {JwtChain} from "../../chains/jwt.chain";
import {ConstantsChain} from "../../chains/constants.chain";

export const chainTool = {
    jwt: new JwtChain(),
    constants: new ConstantsChain()
}