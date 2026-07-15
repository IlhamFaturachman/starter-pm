import type { oas31 } from "openapi3-ts";

export const AuthResponse: oas31.SchemaObject = {
  type: "object",
  properties: {
    token: { type: "string", description: "JWT token" },
    user: { $ref: "#/components/schemas/User" },
  },
};
