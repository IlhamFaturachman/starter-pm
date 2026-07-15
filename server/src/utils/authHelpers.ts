import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../store/db";
import { rateLimit } from "express-rate-limit";

export const OTP_EXPIRATION_MINUTES = 15;
export const OTP_EXPIRATION_MS = OTP_EXPIRATION_MINUTES * 60 * 1000;
export const TEMP_PASSWORD_LENGTH = 10;
export const TEMP_PASSWORD_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

export function generateOtpCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function getOtpExpirationDate(): Date {
  return new Date(Date.now() + OTP_EXPIRATION_MS);
}

export function generateTemporaryPassword(): string {
  let password = "";

  for (let index = 0; index < TEMP_PASSWORD_LENGTH; index += 1) {
    const alphabetIndex = crypto.randomInt(TEMP_PASSWORD_ALPHABET.length);
    password += TEMP_PASSWORD_ALPHABET[alphabetIndex];
  }

  return password;
}

export function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export function hashOtpCode(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function formatUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
    data: {},
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
    data: {},
  },
});
