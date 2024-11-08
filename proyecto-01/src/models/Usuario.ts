import { getDB } from '../config/database';
import { ObjectId } from 'mongodb';

export interface Usuario {
  _id?: ObjectId;
  nombre: string;
  correo: string;
  contraseña: string;
  roles: string[];
  inhabilitado: boolean;
}

// Crear usuario
export const createUsuario = async (usuario: Usuario): Promise<void> => {
  const db = getDB();
  await db.collection('usuarios').insertOne(usuario);
};

// Buscar usuario por correo
export const findUsuarioByCorreo = async (correo: string): Promise<Usuario | null> => {
  const db = getDB();
  const usuario = await db.collection('usuarios').findOne({ correo });
  return usuario ? ({ ...usuario, _id: usuario._id } as Usuario) : null;
};

// Actualizar roles de usuario
export const updateUsuarioRoles = async (correo: string, roles: string[]): Promise<void> => {
  const db = getDB();
  await db.collection('usuarios').updateOne({ correo }, { $set: { roles } });
};

// Soft delete usuario
export const softDeleteUsuario = async (correo: string): Promise<void> => {
  const db = getDB();
  await db.collection('usuarios').updateOne({ correo }, { $set: { inhabilitado: true } });
};
