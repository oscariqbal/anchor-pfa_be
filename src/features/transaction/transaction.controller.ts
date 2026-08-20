import { AppError } from "../../errors/app-error"
import { successResponse, errorResponse } from "../../response/response";
import { mapZodErrors } from "../../errors/validation-error";
import { Request, Response } from "express";
import { createSchema, paramsSchema, updateSchema } from "./transaction.schema";
import * as transactionService from "./transaction.service"

// Create
export async function create(req: Request, res: Response) {
  const body = createSchema.safeParse(req.body);

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
    const response = await transactionService.create(body.data, req.user.id);

    return res.status(201).json(
      successResponse(
        "Transaction created successfully",
        response
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