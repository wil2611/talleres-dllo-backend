// src/middlewares/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/database';
import { Usuario } from '../models/Usuario';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Acceso no autorizado' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const db = getDB();
    const usuario = await db.collection<Usuario>('usuarios').findOne({ _id: new ObjectId(decoded.id) });
    if (!usuario) throw new Error();
    req.user = usuario;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Acceso no autorizado' });
  }
};
