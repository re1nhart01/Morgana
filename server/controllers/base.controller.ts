import {BaseService} from "../services/base.service";
import {Router} from "express";
import {BaseDto} from "../dto/Base.dto";
import {bindDtoWithRequest} from "../internal/dto";
const express = require('express');

type Service<T extends BaseService> = {}

interface BaseControllerType {
    __usafe__group?: string;
}

export abstract class BaseController<T extends BaseService> implements BaseControllerType {
    protected static _expressRouter: Router = new express.Router()
    public __usafe__group: string;
    protected constructor(service: T) {
        this.__usafe__group = 'api';
    }
    public get router() {
        return BaseController._expressRouter;
    }

    public bindJSON = <T extends BaseDto>(dto: T, body: any) => {
        return bindDtoWithRequest(dto, body)
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