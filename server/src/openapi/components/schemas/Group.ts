import type { oas31 } from "openapi3-ts";

export const Group: oas31.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string", example: "admin" },
    description: { type: "string", example: "Full access to all features" },
    permissions: {
      type: "array",
      items: { $ref: "#/components/schemas/Permission" },
    },
  },
};
