import type { oas31 } from "openapi3-ts";

export const signupPath: Record<string, oas31.PathItemObject> = {
  "/api/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      description:
        "Creates a new user account and returns a JWT token for auto-login.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password", "confirmPassword"],
              properties: {
                name: { type: "string", example: "Jane Doe" },
                email: {
                  type: "string",
                  format: "email",
                  example: "jane@example.com",
                },
                password: { type: "string", minLength: 6, example: "secret123" },
                confirmPassword: {
                  type: "string",
                  minLength: 6,
                  example: "secret123",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthResponse" },
            },
          },
        },
        "400": {
          description: "Validation failed or email already exists",
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
