"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const TaskModel = database_1.default.define("task", {
    id: { type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true
    },
    type: { type: sequelize_1.DataTypes.STRING },
    task: { type: sequelize_1.DataTypes.STRING },
    completed: { type: sequelize_1.DataTypes.BOOLEAN },
    created_at: { type: sequelize_1.DataTypes.TIME },
    limit_date: { type: sequelize_1.DataTypes.DATE },
    personaId: { type: sequelize_1.DataTypes.NUMBER }
});
exports.default = TaskModel;
