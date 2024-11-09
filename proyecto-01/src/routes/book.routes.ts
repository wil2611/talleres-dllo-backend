import { Router } from "express";
import { createBook, readBook, updateBook, deleteBook } from "../controllers/book.controller";
import { AuthMiddleware, AuthorizeRole } from "../middlewares/auth";

const router = Router();

router.post("/", AuthMiddleware, AuthorizeRole("librarian"), createBook);
router.get("/", readBook);
router.put("/", AuthMiddleware, AuthorizeRole("librarian"), updateBook);
router.delete("/", AuthMiddleware, AuthorizeRole("admin"), deleteBook);

export default router;
