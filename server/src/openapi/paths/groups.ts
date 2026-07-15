import type { oas31 } from "openapi3-ts";

export const groupsPath: Record<string, oas31.PathItemObject> = {
  "/api/groups": {
    get: {
      tags: ["Groups"],
      summary: "List all groups",
      description: "Returns all groups with their assigned permissions.",
      responses: {
        "200": {
          description: "List of groups",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Group" },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Groups"],
      summary: "Create a new group",
      description: "Creates a group. Assign permissions via the permissions endpoint.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string", example: "editor" },
                description: { type: "string", example: "Can edit content" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Group created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Group" },
            },
          },
        },
        "400": {
          description: "Validation failed or name already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/groups/{id}": {
    get: {
      tags: ["Groups"],
      summary: "Get group detail",
      description: "Returns a single group with its assigned permissions.",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: {
        "200": {
          description: "Group detail",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Group" },
            },
          },
        },
        "404": {
          description: "Group not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    put: {
      tags: ["Groups"],
      summary: "Update a group",
      description: "Updates group name and/or description.",
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
                name: { type: "string", example: "editor" },
                description: { type: "string", example: "Updated description" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Group updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Group" },
            },
          },
        },
        "400": {
          description: "Validation failed or name already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "404": {
          description: "Group not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Groups"],
      summary: "Delete a group",
      description: "Deletes a group and removes all its permission assignments.",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: {
        "204": { description: "Group deleted" },
        "404": {
          description: "Group not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/groups/{id}/permissions": {
    put: {
      tags: ["Groups"],
      summary: "Assign permissions to a group",
      description:
        "Replaces all permissions for the given group. Pass an array of permission IDs.",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["permissionIds"],
              properties: {
                permissionIds: {
                  type: "array",
                  items: { type: "string", format: "uuid" },
                  example: ["uuid-1", "uuid-2"],
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Permissions updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Group" },
            },
          },
        },
        "400": {
          description: "Validation failed or invalid permission IDs",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "404": {
          description: "Group not found",
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
