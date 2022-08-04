import {BaseController} from "./base.controller";
import {UserService} from "../services/user.service";
import {useController, useMiddlewareRoute, useRoute} from "../internal/decorators";
import {Request, Response} from 'express'


@useController('users')
class UsersController extends BaseController<UserService> {
    constructor(private userService: UserService) {
        super();
        this.userService = new UserService()
    }

    @useMiddlewareRoute('/get/:zxc', 'get')
    public getshoto(request: Request, response: Response) {
        response.send({
            isAlive: true,
        })
    }

}


export { UsersController }