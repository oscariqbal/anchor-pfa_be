import { AppError } from "../../errors/app-error"
import { successResponse, errorResponse } from "../../response/response";
import { mapZodErrors } from "../../errors/validation-error";
import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "./auth.schema";
import * as authService from "./auth.service"

// Register
export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(
      errorResponse(
        "Validation failed",
        {
          field: mapZodErrors(result.error)
        }
      )
    );
  }

  try {
    await authService.register(result.data);

    return res.status(201).json(
      successResponse(
        "Account registered",
      )
    )
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json(
        errorResponse(
          error.message
        )
      );
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
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(
      errorResponse(
        "Validation failed",
        {
          field: mapZodErrors(result.error)
        }
      )
    );
  }

  try {
    const response = await authService.login(result.data);

    res.cookie("token", response.token, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
    });

    return res.status(200).json(
      successResponse(
        "Login success",
      )
    )
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json(
        errorResponse(
          error.message
        )
      );
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

  res.status(200).json({
    message: "Logout success",
  });
}

// View account
export async function getCurrentUser(req: Request, res: Response) {
  try {
    const response = await authService.getCurrentUser(req.user.id);

    return res.status(200).json(
      successResponse(
        "View account success",
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