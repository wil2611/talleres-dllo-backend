import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import usuariosRoutes from './routes/usuarios';
import librosRoutes from './routes/libros';

dotenv.config();
const app = express();
app.use(express.json());

connectDB().then(() => {
  console.log('Base de datos conectada');
});

app.use('/usuarios', usuariosRoutes);
app.use('/libros', librosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
