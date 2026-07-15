import type { oas31 } from "openapi3-ts";

export const loginPath: Record<string, oas31.PathItemObject> = {
  "/api/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      description: "Authenticates a user and returns a JWT token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "pram@example.com",
                },
                password: { type: "string", example: "password" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthResponse" },
            },
          },
        },
        "401": {
          description: "Invalid email or password",
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
