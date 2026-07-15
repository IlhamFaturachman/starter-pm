import type { oas31 } from "openapi3-ts";

export const healthPath: Record<string, oas31.PathItemObject> = {
  "/api/health": {
    get: {
      tags: ["Health"],
      summary: "Check server health",
      description:
        "Returns the server status, database connectivity, and current timestamp.",
      responses: {
        "200": {
          description: "Server is healthy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "ok" },
                  timestamp: { type: "string", format: "date-time" },
                  db: { type: "string", example: "connected" },
                },
              },
            },
          },
        },
        "503": {
          description: "Server is degraded (DB disconnected)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "degraded" },
                  timestamp: { type: "string", format: "date-time" },
                  db: { type: "string", example: "disconnected" },
                },
              },
            },
          },
        },
      },
    },
  },
};
