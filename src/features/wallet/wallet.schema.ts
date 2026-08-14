import { z } from "zod";

// === Params ===

export const paramsSchema = z.object({
  id: z
    .coerce
    .number("Wallet id must be a number")
    .int("Wallet id must be an integer")
    .positive("Wallet id must be positive")
})

// === Query ===

export const querySchema = z.object({
  archived: z.
    coerce
    .boolean("Wallet archived must be boolean")
    .optional(),
  type: z
    .enum(["CASH", "BANK", "E_MONEY", "Wallet type must be one of the provided type"])
    .optional(),
  search: z
    .string("Wallet search must be a string")
    .trim()
    .optional(),
});

// === Body ===

export const createSchema = z.object({
  type: z
    .enum(["CASH", "BANK", "E_MONEY"], "Wallet type must be one of the provided type"),
  name: z
    .string("Wallet name must be a string")
    .trim()
    .min(1, "Wallet name is required")
    .max(20, "Wallet name must be at most 20 characters"),
  description: z
    .string("Wallet description must be a string")
    .max(255, "Wallet description must be at most 255 characters")
    .optional(),
}).strict()

export const updateSchema = createSchema.partial().strict()

// === Types ===

export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;