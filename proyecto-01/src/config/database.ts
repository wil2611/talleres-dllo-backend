import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';
let db: Db;

export const connectDB = async (): Promise<void> => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db();
  console.log('Conexión a MongoDB Atlas exitosa');
};

export const getDB = (): Db => {
  if (!db) throw new Error('Base de datos no inicializada');
  return db;
};
