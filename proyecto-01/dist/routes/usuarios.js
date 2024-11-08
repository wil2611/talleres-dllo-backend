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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = require("../models/Usuario");
const authenticate_1 = require("../middlewares/authenticate");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
router.post('/register', (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, contraseña } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(contraseña, 8);
    yield (0, Usuario_1.createUsuario)({ nombre, correo, contraseña: hashedPassword, roles: [], inhabilitado: false });
    res.status(201).send({ success: 'Usuario registrado' });
})));
router.post('/login', (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contraseña } = req.body;
    const usuario = yield (0, Usuario_1.findUsuarioByCorreo)(correo);
    if (!usuario || !(yield bcryptjs_1.default.compare(contraseña, usuario.contraseña))) {
        return res.status(400).send({ error: 'Credenciales inválidas' });
    }
    const token = jsonwebtoken_1.default.sign({ id: usuario._id }, JWT_SECRET);
    res.send({ usuario, token });
})));
router.put('/:correo/roles', authenticate_1.authenticate, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roles } = req.body;
    const { correo } = req.params;
    yield (0, Usuario_1.updateUsuarioRoles)(correo, roles);
    res.send({ success: 'Roles actualizados' });
})));
router.delete('/:correo', authenticate_1.authenticate, (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.params;
    yield (0, Usuario_1.softDeleteUsuario)(correo);
    res.send({ success: 'Usuario inhabilitado' });
})));
exports.default = router;
