import { z } from "zod";

// Create
export const createSchema = z.object({
  type: z
    .enum(["CASH", "BANK", "E_MONEY"]),
  
  name: z
    .string()
    .trim()
    .min(1, "Username must be at least 1 characters")
    .max(10, "Username must be at most 10 characters"),

  desctiption: z
    .string()
    .max(255, "Description")
    .optional(),
})

export type CreateInput = z.infer<typeof createSchema>;

// Update
export const updateSchema = z.object({
    type: z
    .enum(["CASH", "BANK", "E_MONEY"]),
  
  name: z
    .string()
    .trim()
    .min(1, "Username must be at least 1 characters")
    .max(10, "Username must be at most 10 characters"),

  desctiption: z
    .string()
    .max(255, "Description")
    .optional()
    .nullable(),

  isArchived: z
    .boolean(),
})

export type UpdateInput = z.infer<typeof updateSchema>;