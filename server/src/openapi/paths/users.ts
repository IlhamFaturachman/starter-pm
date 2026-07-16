import type { oas31 } from "openapi3-ts";

export const usersPath: Record<string, oas31.PathItemObject> = {
  "/api/users": {
    get: {
      tags: ["Users"],
      summary: "List all users",
      description: "Returns all registered users with their assigned groups, sorted by name. Requires users.read permission.",
      responses: {
        "200": {
          description: "List of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Users"],
      summary: "Create a new user",
      description: "Creates a new user account, hashes their password, and optionally assigns them to groups. Requires users.create permission.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password", "confirmPassword"],
              properties: {
                name: { type: "string", example: "Jane Doe" },
                email: { type: "string", format: "email", example: "jane@example.com" },
                role: { type: "string", enum: ["admin", "member"], default: "member" },
                password: { type: "string", minLength: 6, example: "secret123" },
                confirmPassword: { type: "string", minLength: 6, example: "secret123" },
                groupIds: {
                  type: "array",
                  items: { type: "string", format: "uuid" },
                  example: ["a2c89280-928e-49b8-a6fe-4d7a8e7e8b9a"],
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
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        "400": {
          description: "Validation failed, email already exists, or invalid group IDs",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Get user detail",
      description: "Returns detailed information of a single user with their assigned groups. Requires users.read permission.",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: {
        "200": {
          description: "User details",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    put: {
      tags: ["Users"],
      summary: "Update user",
      description: "Updates user information such as name, email, role, password, and group memberships. Requires users.update permission.",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Jane Smith" },
                email: { type: "string", format: "email", example: "janesmith@example.com" },
                role: { type: "string", enum: ["admin", "member"] },
                password: { type: "string", minLength: 6, example: "newsecret123" },
                groupIds: {
                  type: "array",
                  items: { type: "string", format: "uuid" },
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        "400": {
          description: "Validation failed, email already exists, or invalid group IDs",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Users"],
      summary: "Delete user",
      description: "Deletes a user account. Prevents deleting self and users owning active projects. Requires users.delete permission.",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: {
        "200": {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "User deleted" },
                  data: { type: "object", example: {} },
                },
              },
            },
          },
        },
        "400": {
          description: "Cannot delete self or user owns active projects",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "404": {
          description: "User not found",
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
