import express from "express";
import { Menu, Permission } from "../store/db";
import { sendSuccess, sendError } from "../utils/response";
import { authenticate, requirePermission } from "../middlewares/auth";

const router = express.Router();

router.use(authenticate);
router.use(requirePermission("menus.read"));

router.get("/", async (_req, res) => {
  const menus = await Menu.findAll({ order: [["order", "ASC"]] });
  sendSuccess(res, "Menus retrieved", menus);
});

router.get("/:id", async (req, res) => {
  const menu = await Menu.findByPk(req.params.id, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  if (!menu) {
    return sendError(res, "Menu not found", 404);
  }

  sendSuccess(res, "Menu retrieved", menu);
});

export default router;
