import type { oas31 } from "openapi3-ts";

export const securitySchemes: Record<string, oas31.SecuritySchemeObject> = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
};
