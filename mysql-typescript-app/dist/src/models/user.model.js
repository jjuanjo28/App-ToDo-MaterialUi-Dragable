"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const PersonModel = database_1.default.define("people", {
    idPersona: { type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true
    },
    name: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING },
    password: { type: sequelize_1.DataTypes.STRING },
    user_photo: { type: sequelize_1.DataTypes.BLOB },
    type_user: { type: sequelize_1.DataTypes.STRING }
});
exports.default = PersonModel;
