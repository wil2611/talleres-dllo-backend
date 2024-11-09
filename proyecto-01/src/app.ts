import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";

const SERVER_VERSION = "/api/v1/";

function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(SERVER_VERSION + "users", userRoutes);
    app.use(SERVER_VERSION + "books", bookRoutes);

    app.use((req: Request, res: Response) => {
        res.status(404).json({ message: "Route not found." });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ message: "Internal server error." });
    });

    return app;
}

export default createApp;
