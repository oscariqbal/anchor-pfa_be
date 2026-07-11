import { Request, Response, NextFunction } from "express";

export async function dashboard(req: Request, res: Response) {
  res.json({
    message: "API running",
  });
}