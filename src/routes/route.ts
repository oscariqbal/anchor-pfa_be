import { Router } from "express";

import authMiddleware from "../middlewares/auth";

import { register, login, logout } from "../controllers/auth.controller";
import { dashboard } from "../controllers/analytics.controller";
import { profile } from "../controllers/user.controller";

const router = Router();

// ======== PUBLIC =======

// auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// ======== PROTECTED =======

// transaction

// analytics
router.get("/dashboard", authMiddleware, dashboard);

// user
router.get("/profile", authMiddleware, profile);

export default router;