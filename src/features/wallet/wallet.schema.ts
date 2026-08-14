import { z } from "zod";

// === Params ===

export const paramsSchema = z.object({
  id: z
    .coerce
    .number()
    .int()
    .positive()
});

// === Query ===

export const querySchema = z.object({
  archived: z.
    coerce
    .boolean()
    .optional(),
  type: z
    .enum(["CASH", "BANK", "E_MONEY"])
    .optional(),
  search: z
    .string()
    .trim()
    .optional(),
});

// === Body ===

export const createSchema = z.object({
  type: z
    .enum(["CASH", "BANK", "E_MONEY"]),
  name: z
    .string()
    .trim()
    .min(1, "Name must be at least 1 characters")
    .max(20, "Name must be at most 20 characters"),
  description: z
    .string()
    .max(255, "Description")
    .optional(),
});

export const updateSchema = createSchema.partial();

// === Types ===

export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;