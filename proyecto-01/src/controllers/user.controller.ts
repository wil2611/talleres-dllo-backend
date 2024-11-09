import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export async function createUser(req: Request, res: Response) {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error });
    }
}

export async function readUser(req: Request, res: Response) {
    const user = await UserModel.findOne({ email: req.query.email, password: req.query.password, isDisabled: false });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
}

export async function updateUser(req: Request, res: Response) {
    const { id, ...updates } = req.body;
    const user = await UserModel.findById(id);
    if (!user || (req.body.user.id !== id && req.body.user.role !== "admin" && req.body.user.role !== "librarian")) {
        return res.status(403).json({ message: "Forbidden" });
    }
    Object.assign(user, updates);
    await user.save();
    res.json({ message: "User updated successfully" });
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.body;
    const user = await UserModel.findById(id);
    if (!user || (req.body.user.id !== id && req.body.user.role !== "admin")) {
        return res.status(403).json({ message: "Forbidden" });
    }
    user.isDisabled = true;
    await user.save();
    res.json({ message: "User disabled successfully" });
}
