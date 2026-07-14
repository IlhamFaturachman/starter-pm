import { z } from "zod";
import crypto from "crypto";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, saveDb } from "../store/db";

const router = express.Router();

const signupSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

router.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  const formattedErrors: Record<string, string[]> = {};

  if (!result.success) {
    for (const error of result.error.issues) {
      const fieldName = error.path[0] as string;

      if (!formattedErrors[fieldName]) {
        formattedErrors[fieldName] = [];
      }

      formattedErrors[fieldName].push(error.message);
    }

    return res.status(400).json({
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  const { name, email, password } = result.data;

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
      errors: {
        email: ["Email already exists"],
      },
    });
  }

  const uniqueId = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: uniqueId,
    name,
    email,
    passwordHash: passwordHash,
    role: "member",
  } as const;

  users.push(newUser);
  saveDb();

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET! || "very_secret_pram_password", {
    expiresIn: "7d",
  });

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export default router;
