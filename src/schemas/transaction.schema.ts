import { z } from "zod";
import { TransactionType } from "@prisma/client";

export const trackSchema = z.object({
  type: z
    .enum(TransactionType, "Invalid transaction type"),

  amount: z
    .coerce
    .number()
    .positive("Amount must be a positive number"),

  description: z
    .string()
    .trim()
    .max(255, "Description must be at most 255 characters long")
    .optional(),
  
  categoryId: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),

  savingId: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),

  sourceWalletId: z
    .coerce
    .number()
    .int()
    .positive("ID must be a positive number"),

  destinationWalletId: z
    .coerce
    .number()
    .int()
    .positive()
    .optional(),
});