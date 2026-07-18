import { Request, Response, NextFunction } from "express";

import { prisma } from "../lib/prisma";

export async function profile(req: Request, res: Response) {
  try {
    const userId  = (req as any).userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: {
          message: "User not found",
        }
      });
    }

    return res.status(200).json({  
      message: "success",
      id: userId,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Internal server error",
      }
    });
  }
}