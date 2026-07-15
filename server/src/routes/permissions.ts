import express from "express";
import { Permission, Menu } from "../store/db";

const router = express.Router();

router.get("/", async (_req, res) => {
  const permissions = await Permission.findAll({
    include: [{ model: Menu, as: "menu", attributes: ["id", "name", "route"] }],
    order: [[{ model: Menu, as: "menu" }, "order", "ASC"], ["action", "ASC"]],
  });
  res.json(permissions);
});

export default router;
