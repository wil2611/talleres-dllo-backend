import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno desde .env

export default function handleMongoConnection() {
    const mongoURI = process.env.MONGO_CONN_STRING;
    if (!mongoURI) {
        throw new Error("MongoDB connection string is missing.");
    }

    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB server.");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
}
