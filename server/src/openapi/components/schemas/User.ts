import type { oas31 } from "openapi3-ts";

export const User: oas31.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    name: { type: "string" },
    role: { type: "string", enum: ["admin", "member"] },
  },
};
