import {BaseMiddleware} from "../internal/core/Base.middleware";
import {chainTool} from "../internal/core/index.chain";

class AuthMiddleware extends BaseMiddleware {
    constructor() {
        super();
    }
    public hashPassword = async (request, response, next) => {
        try {
            const plainPassword = request.body.password;
            if (plainPassword === void 0 || plainPassword === null) {
                throw new Error("Password is invalid")
            }
            request.body.password = await chainTool.crypto.hashString(plainPassword);
        } catch (e) {
            console.log('AuthMiddleware.hashPassword ex', e)
        } finally {
            next()
        }
    }
}


export const authMiddleware = new AuthMiddleware();