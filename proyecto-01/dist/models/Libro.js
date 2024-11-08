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
exports.softDeleteLibro = exports.findLibros = exports.createLibro = void 0;
const database_1 = require("../config/database");
const mongodb_1 = require("mongodb");
// Crear libro
const createLibro = (libro) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, database_1.getDB)();
    yield db.collection('libros').insertOne(libro);
});
exports.createLibro = createLibro;
// Buscar libros con filtros
const findLibros = (filtros) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, database_1.getDB)();
    const documentos = yield db.collection('libros').find(Object.assign(Object.assign({}, filtros), { inhabilitado: false })).toArray();
    return documentos.map((doc) => (Object.assign(Object.assign({}, doc), { _id: doc._id })));
});
exports.findLibros = findLibros;
// Soft delete libro
const softDeleteLibro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, database_1.getDB)();
    yield db.collection('libros').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { inhabilitado: true } });
});
exports.softDeleteLibro = softDeleteLibro;
