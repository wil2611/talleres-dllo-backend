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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const database_1 = require("../config/database");
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.status(401).send({ error: 'Acceso no autorizado' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const db = (0, database_1.getDB)();
        const usuario = yield db.collection('usuarios').findOne({ _id: new mongodb_1.ObjectId(decoded.id) });
        if (!usuario)
            throw new Error();
        req.user = usuario;
        next();
    }
    catch (err) {
        res.status(401).send({ error: 'Acceso no autorizado' });
    }
});
exports.authenticate = authenticate;
