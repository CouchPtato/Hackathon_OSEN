import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";



import hobbyRoutes from "./routes/hobbyRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());

// Ensure DB is connected before handling API requests.
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/hobbies", hobbyRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

if (!process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
    });
}

export default app;
