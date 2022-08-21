import {Model, ModelStatic} from "sequelize";
import { BaseDto } from "./core/Base.dto";
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

export type TypedDto<T> = Dto & T

export type Injected<T> = () => T;

export interface Cobol {
    isError: boolean;
    errorsField: ErrorField[];
    errorMessage: string;
}

export interface TypedCobol<T> extends Cobol {
    dto: TypedDto<T>
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
    isMissingInDto: boolean;
}


export type __UNSAFE_DATA = {
    path: string;
    method: METHODS;
    middlewares: Function[]
    __unsafe__group: string;
    __unsafe__dto: any;
    __unsafe__tokens: any;

}

export interface MorganaResponse extends Response {
    cobol: TypedCobol<any>;
    tokens: valuableTokens
}
export type valuableTokens = { access: string | null; refresh: string | null }

export type TOKENS = {
    access_token: string;
    refresh_token: string;
}

export type threadRunner = {
    path: string;
    data: any;
}