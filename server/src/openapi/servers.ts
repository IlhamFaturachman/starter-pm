import type { oas31 } from "openapi3-ts";

export const servers: oas31.ServerObject[] = [
  {
    url: "http://localhost:3000",
    description: "Local dev server",
  },
];
