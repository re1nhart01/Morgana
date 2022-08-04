import {BaseController} from "./base.controller";
import {UserService} from "../services/user.service";
import {useController, useDto, useRoute} from "../internal/decorators";
import {Request, Response} from "express";
import {bindDtoWithRequest} from "../internal/dto";
import {RegisterUserDto} from "../dto/RegisterUser.dto";
import {AuthService} from "../services/auth.service";
import {MorganaResponse} from "../internal/types";

@useController('auth')
class AuthController extends BaseController<any> {
    constructor(public authService: AuthService) {
        super();
        this.authService = new AuthService()
    }

    
    @useDto(new RegisterUserDto())
    @useRoute('/register', 'post')
    public Register(request: Request, response: MorganaResponse) {
        response.send(this.authService.registerService(response.cobol));
    }

}

export {AuthController}