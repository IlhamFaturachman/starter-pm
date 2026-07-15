import express from "express";
import { sequelize } from "../store/db";

const router = express.Router();

router.get("/", async (_req, res) => {
  let dbStatus: "connected" | "disconnected" = "disconnected";
  try {
    await sequelize.authenticate();
    dbStatus = "connected";
  } catch {
    dbStatus = "disconnected";
  }

  const status = dbStatus === "connected" ? "ok" : "degraded";
  const code = dbStatus === "connected" ? 200 : 503;

  res.status(code).json({
    status,
    timestamp: new Date().toISOString(),
    db: dbStatus,
  });
});

export default router;
