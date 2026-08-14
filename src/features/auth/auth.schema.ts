import { z } from "zod";

// === Params ===

// === Query ===

// === Body ===

export const registerSchema = z.object({
  name: z
    .string("Account name must be a string")
    .trim()
    .min(3, "Account name must be at least 3 characters")
    .max(20, "Account name must be at most 20 characters"),
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z
    .string("Password must be a string")
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
}).strict()

export const loginSchema = registerSchema.omit({
  name: true
}).strict()

// === Types ===

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;