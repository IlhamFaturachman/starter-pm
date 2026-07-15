import type { oas31 } from "openapi3-ts";

export const verifyOtpPath: Record<string, oas31.PathItemObject> = {
  "/api/auth/verify-otp": {
    post: {
      tags: ["Auth"],
      summary: "Verify OTP and reset password",
      description:
        "Verifies the 6-digit OTP code and sends a temporary password to the user's email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "code"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "pram@example.com",
                },
                code: {
                  type: "string",
                  pattern: "^\\d{6}$",
                  example: "123456",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Password reset successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { ok: { type: "boolean", example: true } },
              },
            },
          },
        },
        "400": {
          description: "Invalid or expired OTP code",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};
