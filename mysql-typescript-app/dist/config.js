"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.secret = exports.pass = exports.user = exports.db = void 0;
const NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `.env.${NODE_ENV}`
});
// recordar cargar las variables del .env para su base de datos
exports.db = process.env.DB;
exports.user = process.env.USER;
exports.pass = process.env.PASSWORD;
exports.secret = process.env.SECRET;
exports.port = process.env.PORT;
