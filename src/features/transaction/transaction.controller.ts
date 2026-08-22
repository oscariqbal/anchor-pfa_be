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

// Update
export async function update(req: Request, res: Response) {
  const params = paramsSchema.safeParse(req.params)
  const body = updateSchema.safeParse(req.body);

  if (!params.success) {
    return res.status(422).json(
      errorResponse(
        "Request validation failed",
        {
          field: mapZodErrors(params.error)
        }
      )
    )
  }

  if (!body.success) {
    return res.status(422).json(
      errorResponse(
        "Request validation failed",
        {
          field: mapZodErrors(body.error)
        }
      )
    )
  }

  try {
    const response = await transactionService.update(body.data, params.data.id, req.user.id);

    return res.status(200).json(
      successResponse(
        "Transaction updated successfully",
        response
      )
    )
  } catch (error) {
    console.error(error);6

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

// Delete
export async function remove(req: Request, res: Response) {
  const params = paramsSchema.safeParse(req.params)

  if (!params.success) {
    return res.status(422).json(
      errorResponse(
        "Request validation failed",
        {
          field: mapZodErrors(params.error)
        }
      )
    )
  }

  try {
    await transactionService.remove(params.data.id, req.user.id)

    return res.status(200).json(
      successResponse(
        "Transaction destroyed successfully",
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