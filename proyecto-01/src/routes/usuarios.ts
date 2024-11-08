import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUsuario, findUsuarioByCorreo, updateUsuarioRoles, softDeleteUsuario } from '../models/Usuario';
import { authenticate } from '../middlewares/authenticate';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { nombre, correo, contraseña } = req.body;
  const hashedPassword = await bcrypt.hash(contraseña, 8);
  await createUsuario({ nombre, correo, contraseña: hashedPassword, roles: [], inhabilitado: false });
  res.status(201).send({ success: 'Usuario registrado' });
}));

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { correo, contraseña } = req.body;
  const usuario = await findUsuarioByCorreo(correo);

  if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
    return res.status(400).send({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: usuario._id }, JWT_SECRET);
  res.send({ usuario, token });
}));

router.put('/:correo/roles', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { roles } = req.body;
  const { correo } = req.params;
  await updateUsuarioRoles(correo, roles);
  res.send({ success: 'Roles actualizados' });
}));

router.delete('/:correo', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { correo } = req.params;
  await softDeleteUsuario(correo);
  res.send({ success: 'Usuario inhabilitado' });
}));

export default router;
