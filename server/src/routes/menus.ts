import express from "express";
import { Menu, Permission } from "../store/db";

const router = express.Router();

router.get("/", async (_req, res) => {
  const menus = await Menu.findAll({ order: [["order", "ASC"]] });
  res.json(menus);
});

router.get("/:id", async (req, res) => {
  const menu = await Menu.findByPk(req.params.id, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  if (!menu) {
    return res.status(404).json({ message: "Menu not found" });
  }

  res.json(menu);
});

export default router;
