import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import inquiriesRouter from "./routes/inquiries.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Modern Hospitality API",
    storage: mongoose.connection.readyState === 1 ? "mongodb" : "local-demo-json"
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Modern Hospitality API is running!"
  });
});
app.use("/api/inquiries", inquiriesRouter);

app.use((err, _req, res, _next) => {
  console.error("API error:", err.message);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB.");
    } catch (error) {
      console.error("MongoDB connection failed; continuing in local JSON demo mode:", error.message);
    }
  } else {
    console.log("MONGODB_URI not set — using local JSON demo storage.");
  }
  app.listen(port, () => console.log(`Modern Hospitality API running at http://localhost:${port}`));
}
start();
