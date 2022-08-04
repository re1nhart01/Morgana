import {BaseController} from "./base.controller";
import {UserService} from "../services/user.service";
import {useController, useRoute} from "../internal/decorators";
import {Request, Response} from "express";
import {bindDtoWithRequest} from "../internal/dto";
import {RegisterUserDto} from "../dto/RegisterUser.dto";

@useController('auth')
class AuthController extends BaseController<any> {
    constructor(public userService: UserService) {
        super(userService);
    }


    @useRoute('/register', 'post')
    public Register(request: Request, response: Response) {
        console.log(request.body)
        const {dto, isError, missingFields} = bindDtoWithRequest(new RegisterUserDto(), request.body)
        if (isError) {
            response.send({
                statusCode: 500,
                statusMessage: "Internal error!",
                missing: missingFields
            })
            return;
        }
        response.send({
            isAlive: dto,
        })
    }

}

export {AuthController}