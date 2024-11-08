import express, { Request, Response } from 'express';
import { createLibro, findLibros, softDeleteLibro } from '../models/Libro';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/', authenticate, authorize('bibliotecario'), asyncHandler(async (req: Request, res: Response) => {
  await createLibro(req.body);
  res.status(201).send({ success: 'Libro creado' });
}));

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const libros = await findLibros(req.query);
  res.send(libros);
}));

router.delete('/:id', authenticate, authorize('bibliotecario'), asyncHandler(async (req: Request, res: Response) => {
  await softDeleteLibro(req.params.id);
  res.send({ success: 'Libro inhabilitado' });
}));

export default router;
