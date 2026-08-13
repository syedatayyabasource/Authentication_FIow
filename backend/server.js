import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { PORT } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Northstar API" });
});

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Unexpected server error."
  });
});

app.listen(PORT, () => {
  console.log(`Northstar API running at http://localhost:${PORT}`);
});
