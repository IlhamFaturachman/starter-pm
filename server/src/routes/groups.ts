import { z } from "zod";
import express from "express";
import { Group, Permission, GroupPermission } from "../store/db";
import { formatZodErrors } from "../utils/validation";

const router = express.Router();

// ── Schemas ────────────────────────────────────────────────
const createGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
});

const updateGroupSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

const assignPermissionsSchema = z.object({
  permissionIds: z.array(z.string().uuid()),
});

// ── GET / — list all groups ────────────────────────────────
router.get("/", async (_req, res) => {
  const groups = await Group.findAll({
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
    order: [["name", "ASC"]],
  });
  res.json(groups);
});

// ── POST / — create group ──────────────────────────────────
router.post("/", async (req, res) => {
  const result = createGroupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Validation failed", errors: formatZodErrors(result.error) });
  }

  const existing = await Group.findOne({ where: { name: result.data.name } });
  if (existing) {
    return res.status(400).json({ message: "Group name already exists" });
  }

  const group = await Group.create(result.data);
  res.status(201).json(group);
});

// ── GET /:id — group detail with permissions ───────────────
router.get("/:id", async (req, res) => {
  const group = await Group.findByPk(req.params.id, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  res.json(group);
});

// ── PUT /:id — update group ────────────────────────────────
router.put("/:id", async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  const result = updateGroupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Validation failed", errors: formatZodErrors(result.error) });
  }

  if (result.data.name) {
    const existing = await Group.findOne({ where: { name: result.data.name } });
    if (existing && existing.id !== group.id) {
      return res.status(400).json({ message: "Group name already exists" });
    }
  }

  await group.update(result.data);
  res.json(group);
});

// ── DELETE /:id — delete group ─────────────────────────────
router.delete("/:id", async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  await GroupPermission.destroy({ where: { groupId: group.id } });
  await group.destroy();
  res.status(204).end();
});

// ── PUT /:id/permissions — assign permissions (replace all) ─
router.put("/:id/permissions", async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  const result = assignPermissionsSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Validation failed", errors: formatZodErrors(result.error) });
  }

  // verify all permissionIds exist
  const permissions = await Permission.findAll({ where: { id: result.data.permissionIds } });
  if (permissions.length !== result.data.permissionIds.length) {
    return res.status(400).json({ message: "One or more permission IDs are invalid" });
  }

  // replace all
  await GroupPermission.destroy({ where: { groupId: group.id } });
  await GroupPermission.bulkCreate(
    result.data.permissionIds.map((permissionId) => ({
      groupId: group.id,
      permissionId,
    })),
  );

  const updated = await Group.findByPk(group.id, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  res.json(updated);
});

export default router;
