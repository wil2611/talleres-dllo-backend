import { Request, Response } from "express";
import { BookModel } from "../models/book.model";

export async function createBook(req: Request, res: Response) {
    if (req.body.user.role !== "admin" && req.body.user.role !== "librarian") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const book = await BookModel.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: "Error creating book", error });
    }
}

export async function readBook(req: Request, res: Response) {
    const filters = { ...req.query, isDisabled: false };
    const books = await BookModel.find(filters);
    res.json(books);
}

export async function updateBook(req: Request, res: Response) {
    const { id, ...updates } = req.body;
    const book = await BookModel.findById(id);
    if (!book || (req.body.user.role !== "admin" && req.body.user.role !== "librarian")) {
        return res.status(403).json({ message: "Forbidden" });
    }
    Object.assign(book, updates);
    await book.save();
    res.json({ message: "Book updated successfully" });
}

export async function deleteBook(req: Request, res: Response) {
    const { id } = req.body;
    const book = await BookModel.findById(id);
    if (!book || req.body.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    book.isDisabled = true;
    await book.save();
    res.json({ message: "Book disabled successfully" });
}
