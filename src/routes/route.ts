import { Router } from "express";

import authMiddleware from "../middlewares/auth";

import { test } from "../test";
import * as authController from "../features/auth/auth.controller";
import * as walletController from "../features/wallet/wallet.controller";
import * as transactionController from "../features/transaction/transaction.controller"

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
router.delete("/wallets/:id", authMiddleware, walletController.remove)
router.get("/wallets/:id", authMiddleware, walletController.getWallet)
router.get("/wallets", authMiddleware, walletController.getAllWallet)

// transaction
router.post("/transactions", authMiddleware, transactionController.create)
router.patch("/transactions/:id", authMiddleware, transactionController.update)

export default router;