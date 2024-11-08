import { getDB } from '../config/database';
import { ObjectId } from 'mongodb';

export interface Libro {
  _id?: ObjectId;
  titulo: string;
  autor: string;
  genero: string;
  fecha_publicacion: Date;
  casa_editorial: string;
  disponibilidad: boolean;
  inhabilitado: boolean;
}

// Crear libro
export const createLibro = async (libro: Libro): Promise<void> => {
  const db = getDB();
  await db.collection('libros').insertOne(libro);
};

// Buscar libros con filtros
export const findLibros = async (filtros: Partial<Libro>): Promise<Libro[]> => {
  const db = getDB();
  const documentos = await db.collection('libros').find({ ...filtros, inhabilitado: false }).toArray();
  return documentos.map((doc) => ({ ...doc, _id: doc._id } as Libro));
};

// Soft delete libro
export const softDeleteLibro = async (id: string): Promise<void> => {
  const db = getDB();
  await db.collection('libros').updateOne({ _id: new ObjectId(id) }, { $set: { inhabilitado: true } });
};
