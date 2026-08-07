import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { RegisterInput, LoginInput } from "./auth.schema";

// Register
export async function register(data: RegisterInput) {
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    message: "Register success",
  }
}

// Login
export async function login(data: LoginInput) {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("No user found with this email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }
    
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || "secret", 
      { expiresIn: "1h", }
    );
    
    return {
      message: "Login successful",
      token
    };
}

// View account
export async function getCurrentUser(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id:userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}