import { z } from "zod";

/**
 * Format Zod validation errors into a key-value record mapping field names
 * to arrays of error message strings.
 */
export function formatZodErrors(error: z.ZodError): Record<string, string[]> {
  const formattedErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const fieldName = String(issue.path[0] ?? "root");

    if (!formattedErrors[fieldName]) {
      formattedErrors[fieldName] = [];
    }

    formattedErrors[fieldName].push(issue.message);
  }

  return formattedErrors;
}
