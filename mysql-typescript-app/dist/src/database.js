"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
// cuando lo cargue en Sequelize debo parchearlo con ?.toString()
// por que si no, el mismo deja de funcionar
const connect = new sequelize_1.Sequelize(`${config_1.db === null || config_1.db === void 0 ? void 0 : config_1.db.toString()}`, `${config_1.user === null || config_1.user === void 0 ? void 0 : config_1.user.toString()}`, `${config_1.pass === null || config_1.pass === void 0 ? void 0 : config_1.pass.toString()}`, {
    host: "localhost",
    dialect: "mysql",
    port: 3308,
    define: {
        timestamps: false,
    },
});
exports.default = connect;
