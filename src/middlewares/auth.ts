import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      error: "No token provided",
    });
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as { userId: number };
    req.user = {
      id: payload.userId,
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

export default authMiddleware;