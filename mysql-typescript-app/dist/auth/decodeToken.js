"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// funcion para decodificar el token jwt(recuerda importar, Request,Response, NextFunction de express)
function decodeToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, `${config_1.secret}`);
    if (Date.now() > decoded.exp) {
        return res.status(401).send({ error: "token expired" });
    }
    next();
}
exports.decodeToken = decodeToken;
