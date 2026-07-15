import type { oas31 } from "openapi3-ts";

export const Permission: oas31.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    key: { type: "string", example: "projects.create" },
    name: { type: "string", example: "Create Project" },
    menuId: { type: "string", format: "uuid" },
    action: { type: "string", enum: ["create", "read", "update", "delete"] },
  },
};
