import {JwtChain} from "./jwt.chain";
import {ConstantsChain} from "./constants.chain";

export const chainTool = {
    jwt: new JwtChain(),
    constants: new ConstantsChain()
}