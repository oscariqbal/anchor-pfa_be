import { Router } from "express";

import authMiddleware from "../middlewares/auth";

import { test } from "../test";
import { register, login, logout, getCurrentUser } from "../modules/auth/auth.controller";
import { track } from "../modules/transaction/transaction.controller";

const router = Router();

// ======== PUBLIC =======
router.get("/test", test);

// auth
router.post("/auth/register", register);
router.post("/auth/login", login);
// router.patch("/auth/me", me);
// router.delete("/auth/me", me);

// ======== PROTECTED =======

// auth
router.get("/auth/me", authMiddleware, getCurrentUser);
router.post("/auth/logout", authMiddleware, logout);

// transaction
router.post("/transaction", authMiddleware, track)

export default router;