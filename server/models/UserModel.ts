import { DataTypes, Model } from "sequelize";
import {UserModelType} from "../types/models.interface";
import {BaseModel} from "../internal/types";

const Sequel = require('../db/database').eclipseConnection().client;


const User = Sequel.define("users", {
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
        validate: { isEmail: true },
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
        defaultValue: 'There is nothing here, but we think that (s)he is - good person!'
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
        type: DataTypes.DATE,
        unique: false,
        allowNull: true,
    },
    rtcid: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,

    },
    userHash: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    }
})

module.exports = User;