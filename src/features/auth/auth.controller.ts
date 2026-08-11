import { Request, Response, NextFunction } from "express";

import { registerSchema, loginSchema } from "./auth.schema";
import * as authService from "./auth.service"

// Register
export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const response = await authService.register(result.data);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    });
  }
}

// Login
export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const response = await authService.login(result.data);

    res.cookie("token", response.token, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    });
  }
}

// Logout
export async function logout(req: Request, res: Response) {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logout berhasil",
  });
}

// View account
export async function getCurrentUser(req: Request, res: Response) {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    return res.status(200).json({
      message: "View account success",
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    });
  }
}