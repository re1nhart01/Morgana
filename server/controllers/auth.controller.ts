import {BaseController} from "./base.controller";
import {UserService} from "../services/user.service";
import {useController, useRoute} from "../internal/decorators";
import {Request, Response} from "express";
import {bindDtoWithRequest} from "../internal/dto";
import {RegisterUserDto} from "../dto/RegisterUser.dto";
import {AuthService} from "../services/auth.service";

@useController('auth')
class AuthController extends BaseController<any> {
    constructor(public authService: AuthService) {
        super();
        this.authService = new AuthService()
    }

    @useRoute('/register', 'post')
    public Register(request: Request, response: Response) {
        console.log(this, 'this', request, response)
        response.send(this.authService.registerService(this.bindJSON(new RegisterUserDto(), request.body)))
    }

}

export {AuthController}