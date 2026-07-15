import type { oas31 } from "openapi3-ts";

export const menusPath: Record<string, oas31.PathItemObject> = {
  "/api/menus": {
    get: {
      tags: ["Menus"],
      summary: "List all menus",
      description: "Returns every menu, ordered by sidebar position.",
      responses: {
        "200": {
          description: "List of menus",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Menu" },
              },
            },
          },
        },
      },
    },
  },
  "/api/menus/{id}": {
    get: {
      tags: ["Menus"],
      summary: "Get menu detail with permissions",
      description: "Returns a single menu and its associated permissions.",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
      ],
      responses: {
        "200": {
          description: "Menu detail",
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/Menu" },
                  {
                    type: "object",
                    properties: {
                      permissions: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Permission" },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        "404": {
          description: "Menu not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};
