import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "../store/db";
import { formatZodErrors } from "../utils/validation";
import { sendValidationError, sendError } from "../utils/response";

export function validateRequest(schema: z.ZodTypeAny): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return sendValidationError(res, formatZodErrors(result.error));
    }

    req.body = result.data;
    next();
  };
}

export const authenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(res, "Access token is missing or invalid", 401);
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findByPk(decoded.id, {
      include: [
        {
          association: "groups",
          include: [
            {
              association: "permissions",
            },
          ],
        },
      ],
    });

    if (!user) {
      return sendError(res, "User not found", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    return sendError(res, "Access token is missing or invalid", 401);
  }
};

export function requirePermission(permissionKey: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return sendError(res, "Unauthorized", 401);
    }

    if (!user.hasPermission(permissionKey)) {
      return sendError(res, "Forbidden: Insufficient permissions", 403);
    }

    next();
  };
}
