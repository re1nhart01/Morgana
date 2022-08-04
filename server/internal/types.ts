import {Model, ModelStatic} from "sequelize";

export type METHODS = 'get' | 'post' | 'put' | 'delete' | 'all' | 'patch';

export type BaseModel = ModelStatic<Model>;


export interface DATABASE_CONFIG {
    dbName: string;
    username: string;
    password: string;
    host: string;
    dialect: string;
}