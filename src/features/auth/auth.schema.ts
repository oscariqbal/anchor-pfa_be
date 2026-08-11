import { z } from "zod";

// Register
export const registerSchema = z.object({
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

export type RegisterInput = z.infer<typeof registerSchema>;

// Login
export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8)
    .regex(/\d/, "Password must contain at least one number"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Update 
export const updateAccountSchema = registerSchema.partial();