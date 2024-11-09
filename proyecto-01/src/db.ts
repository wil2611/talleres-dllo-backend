import mongoose from "mongoose";
import { env } from "process";

export default function handleMongoConnection() {
    mongoose.connect((env as { MONGO_CONN_STRING: string }).MONGO_CONN_STRING)
        .then(() => {
            console.log("Connected to MongoDB server.");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
}
