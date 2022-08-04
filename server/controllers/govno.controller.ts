import {BaseController} from "./base.controller";
import {UserService} from "../services/user.service";
import {useController, useRoute} from "../internal/decorators";
import {Request, Response} from "express";

@useController('govno')
class GovnoController extends BaseController<any> {
    constructor(public userService: UserService) {
        super(userService);
    }


    @useRoute('12312', 'get')
    public GetSomeShit(request: Request, response: Response) {
        response.send({
            isAlive: false,
        })
    }

}

export {GovnoController}