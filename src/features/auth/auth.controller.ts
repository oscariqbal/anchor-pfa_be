import { AppError } from "../../errors/app-error"
import { successResponse, errorResponse } from "../../response/response";
import { mapZodErrors } from "../../errors/validation-error";
import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.schema";
import * as authService from "./auth.service"

// Register
export async function register(req: Request, res: Response) {
  const body = registerSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json(
      errorResponse(
        "Request validation failed",
        {
          field: mapZodErrors(body.error)
        }
      )
    );
  }

  try {
    await authService.register(body.data);

    return res.status(201).json(
      successResponse(
        "Account registered successfully",
      )
    )
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json(
        errorResponse(
          error.message
        )
      )
    }

    return res.status(500).json(
      errorResponse(
        "Internal server error"
      )
    )
  }
}

// Login
export async function login(req: Request, res: Response) {
  const body = loginSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json(
      errorResponse(
        "Request validation failed",
        {
          field: mapZodErrors(body.error)
        }
      )
    )
  }

  try {
    const response = await authService.login(body.data);

    res.cookie("token", response.token, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
    });

    return res.status(200).json(
      successResponse(
        "Account signed in successfully",
      )
    )
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json(
        errorResponse(
          error.message
        )
      )
    }

    return res.status(500).json(
      errorResponse(
        "Internal server error"
      )
    )
  }
}

// Logout
export async function logout(req: Request, res: Response) {
  res.clearCookie("token");

  return res.status(200).json(
    successResponse(
      "Account signed out successfully",
    )
  )
}

// View account
export async function getCurrentUser(req: Request, res: Response) {
  try {
    const response = await authService.getCurrentUser(req.user.id);

    return res.status(200).json(
      successResponse(
        "Account retrieved successfully",
        response
      )
    )
  } catch (error) {
    console.error(error);

    return res.status(500).json(
      errorResponse(
        "Internal server error"
      )
    )
  }
}