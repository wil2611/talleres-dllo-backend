import { Usuario } from '../../models/Usuario';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Usuario; // Usuario debería ser el tipo de usuario que has definido
  }
}
