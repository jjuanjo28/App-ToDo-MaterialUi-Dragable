"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.createUser = exports.getUser = exports.getAllUsers = exports.getLogin = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const SECRET = process.env.SECRET;
    try {
        const user = req.body;
        const { name, password } = user;
        const isUserExist = yield user_model_1.default.findOne({
            where: {
                name: name
            }
        });
        if (!isUserExist) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        if (isUserExist.password === password) {
            const token = jsonwebtoken_1.default.sign({
                user: isUserExist,
                exp: Date.now() + 600 * 1000
            }, `${SECRET}`);
            const decoded = jsonwebtoken_1.default.verify(token, `${SECRET}`);
            res.status(200).json({
                idUser: decoded.user.idPersona,
                status: 200,
                success: true,
                message: "Login success",
                token: token
            });
        }
        else {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Password wrong"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error"
        });
    }
});
exports.getLogin = getLogin;
// mostrar Todos los user
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findAll();
        res.json(user);
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.getAllUsers = getAllUsers;
// mostrar un user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findAll({
            where: {
                idPersona: req.params.id,
            },
        });
        res.json(user[0]); // de aca sacaba el usuario completo 
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.getUser = getUser;
// crear un nuevo user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = yield user_model_1.default.findAll({
            where: {
                email: req.body.email,
            }
        });
        const user = yield user_model_1.default.findAll({
            where: {
                name: req.body.name,
            }
        });
        if (email.length != 0)
            return res.status(403).json({ message: "el email ya esta uso" });
        if (user.length != 0)
            return res.status(403).json({ message: "el nombre ya esta uso" });
        yield user_model_1.default.create(req.body);
        res.json({
            message: "Usuario Creado Correctamente"
        });
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.createUser = createUser;
// actualizar un user
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("este es mi id:", req.params.id);
        yield user_model_1.default.update(req.body, {
            where: { idPersona: req.params.id },
        });
        res.json({
            message: "Usuario Editado Correctamente",
        });
    }
    catch (error) {
        console.log("soy el req:", req);
        res.json({ message: error });
    }
});
exports.editUser = editUser;
// eliminar un user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.destroy({
            where: { idPersona: req.params.id },
        });
        res.json({
            message: "Usuario Eliminado",
        });
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.deleteUser = deleteUser;
