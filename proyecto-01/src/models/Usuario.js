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
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteUsuario = exports.updateUsuarioRoles = exports.findUsuarioByCorreo = exports.createUsuario = void 0;
// src/models/Usuario.ts
const database_1 = require("../config/database");
// Crear usuario
const createUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, database_1.getDB)();
    yield db.collection('usuarios').insertOne(usuario);
});
exports.createUsuario = createUsuario;
// Buscar usuario por correo y contraseña
const findUsuarioByCorreo = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, database_1.getDB)();
    return db.collection('usuarios').findOne({ correo });
});
exports.findUsuarioByCorreo = findUsuarioByCorreo;
// Actualizar roles de usuario
const updateUsuarioRoles = (correo, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, database_1.getDB)();
    yield db.collection('usuarios').updateOne({ correo }, { $set: { roles } });
});
exports.updateUsuarioRoles = updateUsuarioRoles;
// Soft delete usuario
const softDeleteUsuario = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, database_1.getDB)();
    yield db.collection('usuarios').updateOne({ correo }, { $set: { inhabilitado: true } });
});
exports.softDeleteUsuario = softDeleteUsuario;
