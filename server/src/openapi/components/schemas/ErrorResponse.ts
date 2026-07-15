import type { oas31 } from "openapi3-ts";

export const ErrorResponse: oas31.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string" },
    errors: {
      type: "object",
      additionalProperties: {
        type: "array",
        items: { type: "string" },
      },
    },
  },
};
