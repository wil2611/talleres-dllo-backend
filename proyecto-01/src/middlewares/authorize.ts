// src/middlewares/authorize.ts
import { Request, Response, NextFunction } from 'express';

export const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles.includes(requiredRole)) {
      return res.status(403).send({ error: 'No autorizado' });
    }
    next();
  };
};
