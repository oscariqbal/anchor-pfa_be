import { z } from "zod";
import { TransactionType } from "@prisma/client";

// === Params ===

export const paramsSchema = z.object({
  id: z
    .coerce
    .number("Transaction id must be a number")
    .int("Transaction id must be an integer")
    .positive("Transaction id must be positive")
})

// === Query ===
// example, query filters will added soon
export const querySchema = z.object({
  type: z
    .enum(TransactionType, "Invalid transaction type")
    .optional(),
  search: z 
    .number("Transaction search must be a number")
    .optional(),
});

// === Body ===

export const createSchema = z.object({
  sourceWalletId: z
    .coerce
    .number("Source Wallet Id amount must be a number")
    .int("Source Wallet Id amount must be an integer")
    .positive("Source Wallet Id must be a positive number")
    .optional(),
  destinationWalletId: z
    .coerce
    .number("Source Wallet Id amount must be a number")
    .int("Source Wallet Id amount must be an integer")
    .positive("Source Wallet Id must be a positive number")
    .optional(),
  type: z
    .enum(TransactionType, "Invalid transaction type"),
  amount: z
    .coerce
    .number("Transaction amount must be a number")
    .positive("Transaction amount must be a positive number"),
  note: z
    .string("Transaction note must be a string")
    .trim()
    .min(1, "Transaction note is required")
    .max(255, "Transaction note must be at most 255 characters")
});

export const updateSchema = createSchema.partial()

// === Types ===

export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;