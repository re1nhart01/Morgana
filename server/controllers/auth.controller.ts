import {BaseController} from "../internal/core/base.controller";
import {useController, useDto, useRoute} from "../internal/decorators";
import { Request } from "express";
import {RegisterUserDto} from "../dto/RegisterUser.dto";
import {AuthService} from "../services/auth.service";
import {MorganaResponse} from "../internal/types";

@useController('auth')
class AuthController extends BaseController<any> {
    constructor(public authService: AuthService) {
        super();
        this.authService = new AuthService()
    }


    @useDto(RegisterUserDto)
    @useRoute('/register', 'post')
    public async Register(request: Request, response: MorganaResponse) {
        response.send(await this.authService.registerService(response.cobol));
    }

}

export {AuthController}