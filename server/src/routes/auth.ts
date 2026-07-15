import { z } from "zod";
import express from "express";
import bcrypt from "bcryptjs";
import { OTP, User, sequelize } from "../store/db";
import { sendEmail } from "../utils/email";
import { sendSuccess, sendError, sendValidationError } from "../utils/response";
import { formatZodErrors } from "../utils/validation";
import {
  generateOtpCode,
  getOtpExpirationDate,
  generateTemporaryPassword,
  generateToken,
  formatUserResponse,
  hashOtpCode,
} from "../utils/authHelpers";
import {
  buildOtpEmailHtml,
  buildTemporaryPasswordEmailHtml,
} from "../utils/emailTemplates";

const router = express.Router();

const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email().transform((val) => val.trim().toLowerCase()),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

router.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { name, email, password } = result.data;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return sendError(res, "Email already exists", 400, {
      errors: { email: ["Email already exists"] },
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    passwordHash,
    role: "member",
  });

  const token = generateToken(newUser.id);

  sendSuccess(res, "Signup successful", {
    token,
    user: formatUserResponse(newUser),
  }, 201);
});

const loginSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { email, password } = result.data;

  const user = await User.findOne({ where: { email } });

  let isPasswordValid = false;
  if (user) {
    isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  } else {
    await bcrypt.compare(password, "$2a$10$8.K.fKx.zP9hH6U1G3kQ9.F0oA1fD2s3c4v5b6n7m8q9w0e1r2t3y");
  }

  if (!user || !isPasswordValid) {
    return sendError(res, "Invalid email or password", 401, {
      errors: { email: ["Invalid email or password"] },
    });
  }

  const token = generateToken(user.id);

  sendSuccess(res, "Login successful", {
    token,
    user: formatUserResponse(user),
  });
});

const forgotPasswordSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
});

router.post("/forgot", async (req, res) => {
  const result = forgotPasswordSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { email } = result.data;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return sendSuccess(res, "Reset code sent to your email");
  }

  const code = generateOtpCode();

  try {
    await sendEmail(email, "Your password reset code", buildOtpEmailHtml(code));
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return sendError(res, "Failed to send reset code email. Please try again.", 500);
  }

  const hashedCode = hashOtpCode(code);

  await OTP.upsert({
    email,
    code: hashedCode,
    expiresAt: getOtpExpirationDate(),
    tempUser: null,
    attempts: 0,
  });

  sendSuccess(res, "Reset code sent to your email");
});

const verifyOtpSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
  code: z.string().regex(/^\d{6}$/, "OTP code must be 6 digits"),
});

router.post("/verify-otp", async (req, res) => {
  const result = verifyOtpSchema.safeParse(req.body);

  if (!result.success) {
    return sendValidationError(res, formatZodErrors(result.error));
  }

  const { email, code } = result.data;
  const [user, otp] = await Promise.all([
    User.findOne({ where: { email } }),
    OTP.findOne({ where: { email } }),
  ]);

  if (!otp) {
    return sendError(res, "Invalid OTP code", 400, {
      errors: { code: ["Invalid OTP code"] },
    });
  }

  // Inline expired check
  if (otp.expiresAt.getTime() <= Date.now()) {
    await otp.destroy();
    return sendError(res, "OTP code has expired", 400, {
      errors: { code: ["OTP code has expired"] },
    });
  }

  if (!user) {
    return sendError(res, "Invalid OTP code", 400, {
      errors: { code: ["Invalid OTP code"] },
    });
  }

  const hashedInput = hashOtpCode(code);
  if (otp.code !== hashedInput) {
    const nextAttempts = otp.attempts + 1;
    if (nextAttempts >= 5) {
      await otp.destroy();
      return sendError(res, "Invalid OTP code. Too many failed attempts. Code has been invalidated.", 400, {
        errors: { code: ["Too many failed attempts. Code invalidated."] },
      });
    } else {
      await otp.update({ attempts: nextAttempts });
      return sendError(res, `Invalid OTP code. ${5 - nextAttempts} attempts remaining.`, 400, {
        errors: { code: ["Invalid OTP code"] },
      });
    }
  }

  const temporaryPassword = generateTemporaryPassword();
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  try {
    await sendEmail(
      email,
      "Your temporary password",
      buildTemporaryPasswordEmailHtml(temporaryPassword),
    );
  } catch (error) {
    console.error("Failed to send temporary password email:", error);
    return sendError(res, "Failed to send temporary password email. Please try again.", 500);
  }

  const transaction = await sequelize.transaction();
  try {
    await user.update({ passwordHash }, { transaction });
    await otp.destroy({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Failed to update user password or destroy OTP in transaction:", error);
    return sendError(res, "Failed to finalize password reset. Please try again.", 500);
  }

  sendSuccess(res, "Password reset successful");
});

export default router;
