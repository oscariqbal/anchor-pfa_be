import { Request, Response, NextFunction } from "express";

import { trackSchema,  } from "../schemas/transaction.schema";

import { prisma } from "../lib/prisma";

// ======== TRACK =======
export async function track(req: Request, res: Response) {
  const result = trackSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { type, amount, description, categoryId, sourceWalletId, } = result.data;

  try {
    const existingWallet = await prisma.wallet.findUnique({
      where: {
        id: sourceWalletId,
      },
    });

    if (!existingWallet) {
      return res.status(404).json({
        errors: {
          sourceWalletId: "The source wallet does not exist",
        }
      });
    }

    // CONTINUE HERE
    
    return res.status(201).json({
      message: "Transaction tracked successfully",
    });

  } catch (error) {
    console.error("[TRACK]:", error);

    return res.status(500).json({
      errors: {
        message: "Internal server error",
      }
    });
  }
}
