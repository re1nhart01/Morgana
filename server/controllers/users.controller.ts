import {BaseController} from "./base.controller";
import {UserService} from "../services/user.service";
import {useController, useMiddlewareRoute, useRoute} from "../internal/decorators";
import {Request, Response} from 'express'


@useController('users')
class UsersController extends BaseController<UserService> {
    constructor(public userService: UserService) {
        super(userService);
    }

    @useMiddlewareRoute('get', 'get')
    public getshoto(request: Request, response: Response) {
        response.send({
            isAlive: true,
            data: request.body || null
        })
    }

}


export { UsersController }