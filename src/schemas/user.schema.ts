import { z } from "zod";
import { WalletType, Color} from "@prisma/client";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8)
    .regex(/\d/, "Password must contain at least one number"),
});

export const walletSchema = z.object({
  type: z
    .enum(WalletType, "Invalid wallet type"),

  name: z
    .string()
    .trim()
    .min(1, "Wallet name is required")
    .max(10, "Wallet name must be at most 10 characters"),

  color: z
    .enum(Color, "Invalid color"),
  
  userId: z
    .coerce
    .number()
    .int()
    .positive(),
});

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(20, "Category name must be at most 20 characters"),

  description: z
    .string()
    .optional(),

  color: z
    .enum(Color, "Invalid color"),

  userId: z
    .coerce
    .number()
    .int()
    .positive(),
});