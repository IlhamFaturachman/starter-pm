import express from "express";
import { Permission, Menu } from "../store/db";
import { sendSuccess } from "../utils/response";
import { authenticate, requirePermission } from "../middlewares/auth";

const router = express.Router();

router.get("/", authenticate, requirePermission("permissions.read"), async (_req, res) => {
  const permissions = await Permission.findAll({
    include: [{ model: Menu, as: "menu", attributes: ["id", "name", "route"] }],
    order: [[{ model: Menu, as: "menu" }, "order", "ASC"], ["action", "ASC"]],
  });
  sendSuccess(res, "Permissions retrieved", permissions);
});

export default router;
