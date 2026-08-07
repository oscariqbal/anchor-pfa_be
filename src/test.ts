import { Request, Response, NextFunction } from "express";

export async function test(req: Request, res: Response) {
  return res.status(200).json({
    message: "Test successful",
  });
}