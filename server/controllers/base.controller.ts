import {BaseService} from "../services/base.service";
import {Router} from "express";
const express = require('express');

type Service<T extends BaseService> = {}

interface BaseControllerType {
    __usafe__group?: string;
}

export abstract class BaseController<T extends BaseService> implements BaseControllerType {
    protected static _expressRouter: Router = new express.Router()
    public __usafe__group: string;
    protected constructor(service: Service<T>) {
        this.__usafe__group = 'api';
    }
    public get router() {
        return BaseController._expressRouter;
    }



    protected joinRoute = (...endUrls: string[]) => {
        let result = `/${this.__usafe__group}/`
        for (let i of endUrls) {
            result += `${i}/`
        }
        console.log(result)
        return result
    }

}