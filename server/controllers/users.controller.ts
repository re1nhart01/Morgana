import {BaseController} from "../internal/core/base.controller";
import {UserService} from "../services/user.service";
import {useController, useMiddlewareRoute, useRoute} from "../internal/decorators";
import {Request, Response} from 'express'


@useController('users')
class UsersController extends BaseController<UserService> {
    constructor(private userService: UserService) {
        super();
        this.userService = new UserService()
    }

    // @useMiddlewareRoute(() => {console.log('from middleware')})
    @useRoute('/register2', 'post')
    public getshoto(request: Request, response: Response) {
       console.log(request, response)
    }

}


export { UsersController }