import { Router } from "express";

import authMiddleware from "../middlewares/auth";

import { test } from "../test";
import * as authController from "../modules/auth/auth.controller";
import * as walletController from "../modules/wallet/wallet.controller";
import { track } from "../modules/transaction/transaction.controller";

const router = Router();

// ======== PUBLIC =======
router.get("/test", test);

// auth
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
// router.patch("/auth/me", me);
// router.delete("/auth/me", me);

// ======== PROTECTED =======
// auth
router.get("/auth/me", authMiddleware, authController.getCurrentUser);
router.post("/auth/logout", authMiddleware, authController.logout);

// wallet
router.post("/wallets", authMiddleware, walletController.create)
router.patch("/wallets/:id", authMiddleware, walletController.update)

// transaction

export default router;