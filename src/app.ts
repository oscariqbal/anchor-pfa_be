import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/auth";

const app = express();

app.use(cors());
app.use(express.json());


// ======= REGISTER =======
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: {
          email: !email ? "Email is required" : undefined,
          password: !password ? "Password is required" : undefined,
          name: !name ? "Name is required" : undefined,
        }
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        error: {
          email: "Invalid email",
        }
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: {
          email: "Email already exists",
        }
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: {
          password: "Password must be at least 8 characters",
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: {
        message: "Internal server error",
      }
    });
  }
});


// ======= LOGIN ======
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: {
          email: !email ? "Email is required" : undefined,
          password: !password ? "Password is required" : undefined,
        }
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        error: {
          email: "Invalid email",
        }
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: {
          password: "Password must be at least 6 characters",
        }
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: {
          email: "Invalid email or password",
          password: "Invalid email or password",
        }
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          email: "Invalid email or password",
          password: "Invalid email or password",
        }
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h", });
    return res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {

    return res.status(500).json({
      error: {
        message: "Internal server error",
      }
    });
  }
});


// ======= PROFILE =======
app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId  = (req as any).userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    
    if (!user) {
      return res.status(404).json({
        error: {
          message: "User not found",
        }
      });
    }

    return res.status(200).json({  
      message: "success",
      id: userId,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({
      error: {
        message: "Internal server error",
      }
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "API running",
  });
});

export default app;
