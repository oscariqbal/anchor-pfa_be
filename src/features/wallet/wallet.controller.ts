import { Request, Response, NextFunction } from "express";

import { createSchema, paramsSchema, updateSchema } from "./wallet.schema";
import * as walletService from "./wallet.service"

// Create
export async function create(req: Request, res: Response) {
  const body = createSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: body.error.flatten().fieldErrors,
    });
  }

  try {
    const response = await walletService.create(body.data, req.user.id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    });
  }
}

// Update
export async function update(req: Request, res: Response) {
  const params = paramsSchema.safeParse(req.params)
  const body = updateSchema.safeParse(req.body);

  if (!params.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: params.error.flatten().fieldErrors,
    })
  }

  if (!body.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: body.error.flatten().fieldErrors,
    });
  }

  try {
    const response = await walletService.update(body.data, params.data.id, req.user.id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    });
  }
}

// Delete
export async function remove(req: Request, res: Response) {
  const params = paramsSchema.safeParse(req.params)

  if (!params.success) {
    return res.status(400).json({
      message: "Validation Error",
      errors: params.error.flatten().fieldErrors,
    })
  }

  try {
    const response = await walletService.remove(params.data.id, req.user.id)

    return res.status(201)
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    })
  }
}

// Archive
export async function archive(req: Request, res: Response) {
  const params = paramsSchema.safeParse(req.params)

  if (!params.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: params.error.flatten().fieldErrors,
    })
  }

  try {
    const response = await walletService.archive(params.data.id, req.user.id)

    return res.status(201).json(response)
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    })
  }
}

// Dearchive
export async function dearchive(req: Request, res: Response) {
  const params = paramsSchema.safeParse(req.params)

  if (!params.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: params.error.flatten().fieldErrors,
    })
  }

  try {
    const response = await walletService.dearchive(params.data.id, req.user.id)
    
    return res.status(201).json(response)
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: error,
    })
  }
}

// View a wallet
export async function getWallet(req: Request, res: Response) {
  const params = paramsSchema.safeParse(req.params)

  if (!params.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: params.error.flatten().fieldErrors,
    })
  }

  try {
    const response = await walletService.getWallet(params.data.id, req.user.id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    });
  }
}

// View all wallets
export async function getAllWallet(req: Request, res: Response) {
  try {
    const response = await walletService.getAllWallet(req.user.id)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: "Internal server error",
    })
  }
}