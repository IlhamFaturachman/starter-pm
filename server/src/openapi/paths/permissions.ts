import type { oas31 } from "openapi3-ts";

export const permissionsPath: Record<string, oas31.PathItemObject> = {
  "/api/permissions": {
    get: {
      tags: ["Permissions"],
      summary: "List all permissions",
      description: "Returns every permission in the system, grouped by menu.",
      responses: {
        "200": {
          description: "List of permissions",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Permission" },
              },
            },
          },
        },
      },
    },
  },
};
