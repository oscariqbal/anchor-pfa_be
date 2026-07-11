import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/route";

const app = express();

app.use(cors({  // caritau lebih lanjut soal masalah cors
  origin: "http://localhost:3000",  // caritau lebih lanjut soal masalah cors
  credentials: true,  // caritau lebih lanjut soal masalah cors
}));  // caritau lebih lanjut soal masalah cors
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

export default app;
