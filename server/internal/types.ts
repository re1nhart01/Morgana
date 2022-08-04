import {Model, ModelStatic} from "sequelize";
import { BaseDto } from "../dto/Base.dto";

export type METHODS = 'get' | 'post' | 'put' | 'delete' | 'all' | 'patch';

export type DtoField = {
    required: boolean;
    defaultValue: any;
    type: TYPES;
}

export type TYPES = "NUMBER" | "STRING" | "BOOLEAN" | "OBJECT" | "ARRAY" | "NULL" | "NONE";

export type BaseModel = ModelStatic<Model>;

export interface Dto extends BaseDto {
}

export interface Cobol {
    dto: Dto;
    isError: boolean;
    missingFields: string[];
    errorMessage: string;
}

export interface DATABASE_CONFIG {
    dbName: string;
    username: string;
    password: string;
    host: string;
    dialect: string;
}

export interface Response {
    statusCode: number;
    statusMessage: string;
    data?: any;
}