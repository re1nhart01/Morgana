import { Dialect } from "sequelize";
import {DATABASE_CONFIG} from "../internal/types";
const { Sequelize } = require('sequelize');

const config: DATABASE_CONFIG = {
    dbName: process.env.DB_NAME || '',
    dialect: process.env.DB_DIALECT || '',
    host: process.env.DB_HOST || '',
    password: process.env.DB_PASSWORD || '',
    username: process.env.DB_USERNAME || ''
}


class Database {
    constructor(private config: DATABASE_CONFIG) {}

    private get sequel() {
        return Sequelize;
    }

    public createDatabaseConnection = () => {
            try {
                    const { dialect, host, password, dbName, username } = this.config;
                    const db = new this.sequel(dbName, username, password, {
                        host: host,
                        dialect: dialect,
                        logging: (sql: string, timing: number) => {
                            console.log(`OPERATION: ${sql} WAS FIRED: ${new Date().toString()}`)
                        }
                    });
                db.authenticate().then();
                console.log('Connection has been established successfully.');
                return db;
            } catch (error) {
                console.error('Unable to connect to the database:', error);
                return null;
            }
    }

}


export const db = new Database(config)
module.exports = db.createDatabaseConnection();
