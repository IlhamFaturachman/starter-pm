import type { oas31 } from "openapi3-ts";

export const Menu: oas31.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string", example: "Projects" },
    route: { type: "string", example: "/projects" },
    order: { type: "integer", example: 1 },
  },
};
