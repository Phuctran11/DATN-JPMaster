import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("E-learning API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await pool.query("SELECT NOW()");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error instanceof Error ? error.message : "Unknown error");
  }
});
