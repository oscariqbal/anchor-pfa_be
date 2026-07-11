import { Request, Response, NextFunction } from "express";

import { registerSchema, loginSchema } from "../schemas/auth.schema";

import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======== REGISTER =======
export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { name, email, password } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        errors: {
          email: "Email already exists",
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Register successful",
    });

  } catch (error) {
    console.error("[REGISTER]:", error);

    return res.status(500).json({
      errors: {
        message: "Internal server error",
      }
    });
  }
}

// ======== LOGIN =======
export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
        errors: result.error.flatten().fieldErrors,
    });
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: {
          email: "Invalid email or password",
          password: "Invalid email or password",
        }
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        errors: {
          email: "Invalid email or password",
          password: "Invalid email or password",
        }
      });
    }
    
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || "secret", 
      { expiresIn: "1h", }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
    });
    
    return res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    console.error("[LOGIN]:", error);

    return res.status(500).json({
      errors: {
        message: "Internal server error",
      }
    });
  }
}

// ======== LOGOUT =======
export async function logout(req: Request, res: Response) {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logout berhasil",
  });
}