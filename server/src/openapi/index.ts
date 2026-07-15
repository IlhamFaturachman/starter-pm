import type { oas31 } from "openapi3-ts";

import { info } from "./info";
import { servers } from "./servers";
import { securitySchemes } from "./components/securitySchemes";
import { User } from "./components/schemas/User";
import { AuthResponse } from "./components/schemas/AuthResponse";
import { ErrorResponse } from "./components/schemas/ErrorResponse";
import { healthPath } from "./paths/health";
import { signupPath } from "./paths/auth/signup";

export const openApiSpec: oas31.OpenAPIObject = {
  openapi: "3.1.0",
  info,
  servers,
  components: {
    securitySchemes,
    schemas: {
      User,
      AuthResponse,
      ErrorResponse,
    },
  },
  paths: {
    ...healthPath,
    ...signupPath,
  },
};
