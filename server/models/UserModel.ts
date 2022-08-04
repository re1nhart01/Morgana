import { DataTypes, Model } from "sequelize";
import {UserModelType} from "../types/models.interface";
import {BaseModel} from "../internal/types";
const Sequelize = require('../db/database')




export const UserModel: BaseModel = Sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        unique: false,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true,
    },
    icon: {
        type: DataTypes.TEXT,
        unique: false,
        allowNull: true,
    },
    about: {
        type: DataTypes.TEXT,
        unique: false,
        allowNull: true,
    },
    color: {
        type: DataTypes.TEXT,
        unique: false,
        allowNull: false,
        defaultValue: "#800080",
    },
    theme: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
        defaultValue: false,
    },
    inviteHash: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
    birth: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
    },
    rtcID: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
}, {})


