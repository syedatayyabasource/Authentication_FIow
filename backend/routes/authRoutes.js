import { Router } from "express";
import { signup, login, currentUser } from "../controllers/auth.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, currentUser);

export default router;
