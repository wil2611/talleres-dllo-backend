import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { UserModel } from "../models/user.model";

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized." });

    const decodedToken = decode(token);
    if (!decodedToken || typeof decodedToken === "string") return res.status(401).json({ message: "Invalid token." });

    const user = await UserModel.findById(decodedToken.userId);
    if (!user || user.isDisabled) return res.status(403).json({ message: "User disabled or not found." });

    req.body.user = user;
    next();
}

export function AuthorizeRole(requiredRole: "admin" | "librarian") {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;
        if (user.role === requiredRole || user.role === "admin") return next();
        res.status(403).json({ message: "Insufficient permissions." });
    };
}
