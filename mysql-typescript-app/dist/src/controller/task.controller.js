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
exports.deleteTask = exports.editTask = exports.getTasksUser = exports.getOneTask = exports.createTask = exports.getAllTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = function (req, res) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
    if (Date.now() > decoded.exp) {
        return res.status(401).send({ error: "token expired" });
    }
};
function getAllTasks(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
            if (Date.now() > decoded.exp) {
                return res.status(401).send({ error: "token expired" });
            }
            verifyToken(req, res);
            const tasks = yield task_model_1.default.findAll();
            res.json(tasks);
        }
        catch (error) {
            res.json({ message: error });
        }
    });
}
exports.getAllTasks = getAllTasks;
// crear un nuevo Prestamo
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
        if (Date.now() > decoded.exp) {
            return res.status(401).send({ error: "token expired" });
        }
        yield task_model_1.default.create(req.body);
        res.json({
            message: "Prestamo Creado Correctamente",
        });
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.createTask = createTask;
// Mostrar un Prestamo
const getOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
        if (Date.now() > decoded.exp) {
            return res.status(401).send({ error: "token expired" });
        }
        const prestamo = yield task_model_1.default.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.json(prestamo);
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.getOneTask = getOneTask;
const getTasksUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
        if (Date.now() > decoded.exp) {
            return res.status(401).send({ error: "token expired" });
        }
        const prestamo = yield task_model_1.default.findAll({
            where: {
                personaID: req.params.id,
            },
        });
        res.json(prestamo);
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.getTasksUser = getTasksUser;
// actualizar un Prestamo
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
        if (Date.now() > decoded.exp) {
            return res.status(401).send({ error: "token expired" });
        }
        yield task_model_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        res.json({
            message: "Prestamo Editado Correctamente",
        });
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.editTask = editTask;
// eliminar un Prestamo
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const token = (_e = req.headers.authorization) === null || _e === void 0 ? void 0 : _e.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "secretKey");
        if (Date.now() > decoded.exp) {
            return res.status(401).send({ error: "token expired" });
        }
        verifyToken(req, res);
        yield task_model_1.default.destroy({
            where: { id: req.params.id },
        });
        res.json({
            message: "Prestamo Eliminado",
        });
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.deleteTask = deleteTask;
