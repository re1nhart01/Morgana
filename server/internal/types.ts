import {Model, ModelStatic} from "sequelize";
import { BaseDto } from "../dto/Base.dto";
import {Request, Response} from "express";
export type METHODS = 'get' | 'post' | 'put' | 'delete' | 'all' | 'patch';

export type DtoField = {
    required: boolean;
    defaultValue?: any;
    type: TYPES;
    min?: number;
    max?: number;
}

export type TYPES = "NUMBER" | "STRING" | "BOOLEAN" | "OBJECT" | "ARRAY" | "NULL" | "NONE";

export type BaseModel = ModelStatic<Model>;

export interface Dto extends BaseDto {
}

export interface Cobol {
    dto: Dto;
    isError: boolean;
    errorsField: ErrorField[];
    errorMessage: string;
}

export interface DATABASE_CONFIG {
    dbName: string;
    username: string;
    password: string;
    host: string;
    dialect: string;
}

export interface ResponseData {
    statusCode: number;
    statusMessage: string;
    data?: any;
}

export interface ErrorField {
    isMissing: boolean;
    name: string;
    isLessThanMin: boolean;
    isLongerThanMax: boolean;
}


export type __UNSAFE_DATA = {
    path: string;
    method: METHODS;
    middlewares: Function[]
    __unsafe__group: string;
    __unsafe__dto: any;
}

export interface MorganaResponse extends Response {
    cobol: Cobol;
}