import { Router } from "express";
import { createUser, readUser, updateUser, deleteUser } from "../controllers/user.controller";
import { AuthMiddleware, AuthorizeRole } from "../middlewares/auth";

const router = Router();

router.post("/", createUser);
router.get("/", readUser);
router.put("/", AuthMiddleware, AuthorizeRole("librarian"), updateUser);
router.delete("/", AuthMiddleware, AuthorizeRole("admin"), deleteUser);

export default router;
