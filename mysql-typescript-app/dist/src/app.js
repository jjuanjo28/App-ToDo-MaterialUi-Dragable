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
exports.App = exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const NODE_ENV = process.env.NODE_ENV || "development";
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + ".jpg");
    }
});
exports.upload = (0, multer_1.default)({ storage });
require("dotenv").config({
    path: `.env.${NODE_ENV}`
});
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.middleware();
        this.routes();
    }
    settings() {
        this.app.set("port", this.port || config_1.port || 3000);
    }
    middleware() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static("files"));
    }
    routes() {
        this.app.use("/tasks", tasks_routes_1.default);
        this.app.use("/users", user_routes_1.default);
        this.app.use("/uploads", express_1.default.static(path_1.default.resolve(__dirname, "../../uploads")));
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.listen(this.app.get("port"));
            console.log(`Server on port ${this.app.get("port")}`);
        });
    }
}
exports.App = App;
