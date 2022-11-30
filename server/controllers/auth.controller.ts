import {BaseController} from "../internal/core/base.controller";
import {useController, useDto, useMiddleware, useRoute, useTokens} from "../internal/decorators";
import { Request } from "express";
import {RegisterUserDto} from "../dto/RegisterUser.dto";
import {AuthService} from "../services/auth.service";
import {MorganaResponse} from "../internal/types";
import {authMiddleware} from "../middleware/Auth.middleware";
import {SignInDto} from "../dto/SignIn.dto";

@useController('auth')
class AuthController extends BaseController<AuthService> {
    constructor(public authService: AuthService) {
        super();
        this.authService = new AuthService()
    }

    @useMiddleware(authMiddleware.hashPassword)
    @useDto(RegisterUserDto)
    @useRoute('/register', 'post')
    public async Register(request: Request, response: MorganaResponse) {
        response.send(await this.authService.registerService(response.cobol));
    }

    @useDto(SignInDto)
    @useRoute('/sign-in', 'post')
    public async SignIn(Request, response: MorganaResponse) {
        response.send(await this.authService.signInService(response.cobol))
        console.log(response.cobol)
    }


    @useTokens()
    @useRoute("/ping", 'post')
    public async PingRefresh(request: Request, response: MorganaResponse) {
        response.send(await this.authService.pingRefresh(response.tokens.refresh))
    }

    @useTokens()
    @useRoute("/self", 'get')
    public async GetSelfByTokens(request: Request, response: MorganaResponse) {
        response.send(await this.authService.getSelfByTokens(response.tokens))
    }

}

export {AuthController}
