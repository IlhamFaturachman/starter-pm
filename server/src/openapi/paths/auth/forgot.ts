import type { oas31 } from "openapi3-ts";

export const forgotPath: Record<string, oas31.PathItemObject> = {
  "/api/auth/forgot": {
    post: {
      tags: ["Auth"],
      summary: "Request password reset",
      description:
        "Sends a 6-digit OTP code to the user's email for password reset.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "pram@example.com",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "OTP code sent",
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
          description: "Email not found or validation failed",
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
