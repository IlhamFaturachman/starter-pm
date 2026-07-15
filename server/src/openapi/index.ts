import type { oas31 } from "openapi3-ts";

import { info } from "./info";
import { servers } from "./servers";
import { securitySchemes } from "./components/securitySchemes";
import { User } from "./components/schemas/User";
import { AuthResponse } from "./components/schemas/AuthResponse";
import { ErrorResponse } from "./components/schemas/ErrorResponse";
import { Permission } from "./components/schemas/Permission";
import { Group } from "./components/schemas/Group";
import { Menu } from "./components/schemas/Menu";
import { healthPath } from "./paths/health";
import { signupPath } from "./paths/auth/signup";
import { loginPath } from "./paths/auth/login";
import { forgotPath } from "./paths/auth/forgot";
import { verifyOtpPath } from "./paths/auth/verifyOtp";
import { permissionsPath } from "./paths/permissions";
import { groupsPath } from "./paths/groups";
import { menusPath } from "./paths/menus";

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
      Permission,
      Group,
      Menu,
    },
  },
  paths: {
    ...healthPath,
    ...signupPath,
    ...loginPath,
    ...forgotPath,
    ...verifyOtpPath,
    ...permissionsPath,
    ...groupsPath,
    ...menusPath,
  },
};
