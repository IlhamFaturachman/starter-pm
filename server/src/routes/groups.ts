import { z } from "zod";
import express, { Request, Response } from "express";
import { Group, Permission, GroupPermission } from "../store/db";
import { sendSuccess, sendError } from "../utils/response";
import { authenticate, requirePermission, validateRequest } from "../middlewares/auth";

const router = express.Router();

router.use(authenticate);

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
router.get("/", requirePermission("groups.read"), async (_req, res) => {
  const groups = await Group.findAll({
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
    order: [["name", "ASC"]],
  });
  sendSuccess(res, "Groups retrieved", groups);
});

// ── POST / — create group ──────────────────────────────────
router.post("/", requirePermission("groups.create"), validateRequest(createGroupSchema), async (req, res) => {
  const existing = await Group.findOne({ where: { name: req.body.name } });
  if (existing) {
    return sendError(res, "Group name already exists", 400);
  }

  const group = await Group.create(req.body);
  sendSuccess(res, "Group created", group, 201);
});

// ── GET /:id — group detail with permissions ───────────────
router.get("/:id", requirePermission("groups.read"), async (req: Request, res: Response) => {
  const group = await Group.findByPk(req.params.id as string, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  sendSuccess(res, "Group retrieved", group);
});

// ── PUT /:id — update group ────────────────────────────────
router.put("/:id", requirePermission("groups.update"), validateRequest(updateGroupSchema), async (req: Request, res: Response) => {
  const group = await Group.findByPk(req.params.id as string);
  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  if (req.body.name) {
    const existing = await Group.findOne({ where: { name: req.body.name } });
    if (existing && existing.id !== group.id) {
      return sendError(res, "Group name already exists", 400);
    }
  }

  await group.update(req.body);
  sendSuccess(res, "Group updated", group);
});

// ── DELETE /:id — delete group ─────────────────────────────
router.delete("/:id", requirePermission("groups.delete"), async (req: Request, res: Response) => {
  const group = await Group.findByPk(req.params.id as string);
  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  await GroupPermission.destroy({ where: { groupId: group.id } });
  await group.destroy();
  sendSuccess(res, "Group deleted");
});

// ── PUT /:id/permissions — assign permissions (replace all) ─
router.put("/:id/permissions", requirePermission("groups.update"), validateRequest(assignPermissionsSchema), async (req: Request, res: Response) => {
  const group = await Group.findByPk(req.params.id as string);
  if (!group) {
    return sendError(res, "Group not found", 404);
  }

  // verify all permissionIds exist
  const permissions = await Permission.findAll({ where: { id: req.body.permissionIds } });
  if (permissions.length !== req.body.permissionIds.length) {
    return sendError(res, "One or more permission IDs are invalid", 400);
  }

  // replace all
  await GroupPermission.destroy({ where: { groupId: group.id } });
  await GroupPermission.bulkCreate(
    req.body.permissionIds.map((permissionId: string) => ({
      groupId: group.id,
      permissionId,
    })),
  );

  const updated = await Group.findByPk(group.id, {
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "name", "action"] }],
  });

  sendSuccess(res, "Permissions updated", updated);
});

export default router;
