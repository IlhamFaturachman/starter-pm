import { z } from "zod";
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, Group, UserGroup, Project, Task, OTP } from "../store/db";
import { sendSuccess, sendError } from "../utils/response";
import { authenticate, requirePermission, validateRequest } from "../middlewares/auth";
import { formatZodErrors } from "../utils/validation";

const router = express.Router();

router.use(authenticate);

// ── Schemas ────────────────────────────────────────────────
const createUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.email().transform((val) => val.toLowerCase()),
    role: z.enum(["admin", "member"]).default("member"),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    groupIds: z.array(z.string().uuid()).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.email().transform((val) => val.toLowerCase()).optional(),
  role: z.enum(["admin", "member"]).optional(),
  password: z.string().min(6).optional(),
  groupIds: z.array(z.string().uuid()).optional(),
});

// ── GET / — list all users ────────────────────────────────
router.get("/", requirePermission("users.read"), async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash"] },
    include: [
      {
        model: Group,
        as: "groups",
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
    ],
    order: [["name", "ASC"]],
  });
  sendSuccess(res, "Users retrieved", users);
});

// ── GET /:id — user detail ──────────────────────────────────
router.get("/:id", requirePermission("users.read"), async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id as string, {
    attributes: { exclude: ["passwordHash"] },
    include: [
      {
        model: Group,
        as: "groups",
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
    ],
  });

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  sendSuccess(res, "User retrieved", user);
});

// ── POST / — create user ────────────────────────────────────
router.post("/", requirePermission("users.create"), validateRequest(createUserSchema), async (req: Request, res: Response) => {
  const { name, email, role, password, groupIds } = req.body;

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return sendError(res, "Email already exists", 400);
  }

  if (groupIds && groupIds.length > 0) {
    const groups = await Group.findAll({ where: { id: groupIds } });
    if (groups.length !== groupIds.length) {
      return sendError(res, "One or more group IDs are invalid", 400);
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    role,
    passwordHash,
  });

  if (groupIds && groupIds.length > 0) {
    await UserGroup.bulkCreate(
      groupIds.map((groupId: string) => ({
        userId: user.id,
        groupId,
      })),
    );
  }

  const createdUser = await User.findByPk(user.id, {
    attributes: { exclude: ["passwordHash"] },
    include: [
      {
        model: Group,
        as: "groups",
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
    ],
  });

  sendSuccess(res, "User created", createdUser, 201);
});

// ── PUT /:id — update user ──────────────────────────────────
router.put("/:id", requirePermission("users.update"), validateRequest(updateUserSchema), async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id as string);
  if (!user) {
    return sendError(res, "User not found", 404);
  }

  const { name, email, role, password, groupIds } = req.body;

  if (email && email !== user.email) {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return sendError(res, "Email already exists", 400);
    }
  }

  if (groupIds) {
    const groups = await Group.findAll({ where: { id: groupIds } });
    if (groups.length !== groupIds.length) {
      return sendError(res, "One or more group IDs are invalid", 400);
    }
  }

  const updateData: Partial<any> = {};
  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (role !== undefined) updateData.role = role;
  if (password !== undefined) {
    updateData.passwordHash = await bcrypt.hash(password, 10);
  }

  await user.update(updateData);

  if (groupIds) {
    await UserGroup.destroy({ where: { userId: user.id } });
    if (groupIds.length > 0) {
      await UserGroup.bulkCreate(
        groupIds.map((groupId: string) => ({
          userId: user.id,
          groupId,
        })),
      );
    }
  }

  const updatedUser = await User.findByPk(user.id, {
    attributes: { exclude: ["passwordHash"] },
    include: [
      {
        model: Group,
        as: "groups",
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
    ],
  });

  sendSuccess(res, "User updated", updatedUser);
});

// ── DELETE /:id — delete user ───────────────────────────────
router.delete("/:id", requirePermission("users.delete"), async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id as string);
  if (!user) {
    return sendError(res, "User not found", 404);
  }

  if (req.user && req.user.id === user.id) {
    return sendError(res, "You cannot delete your own account", 400);
  }

  const projectCount = await Project.count({ where: { ownerId: user.id } });
  if (projectCount > 0) {
    return sendError(
      res,
      "Cannot delete user because they own one or more projects. Please reassign ownership first.",
      400,
    );
  }

  await Task.update({ assigneeId: null }, { where: { assigneeId: user.id } });
  await UserGroup.destroy({ where: { userId: user.id } });
  await OTP.destroy({ where: { email: user.email } });

  await user.destroy();
  sendSuccess(res, "User deleted");
});

export default router;
