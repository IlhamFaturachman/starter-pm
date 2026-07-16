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
import { Project } from "./components/schemas/Project";
import { Task } from "./components/schemas/Task";
import { healthPath } from "./paths/health";
import { signupPath } from "./paths/auth/signup";
import { loginPath } from "./paths/auth/login";
import { forgotPath } from "./paths/auth/forgot";
import { verifyOtpPath } from "./paths/auth/verifyOtp";
import { permissionsPath } from "./paths/permissions";
import { groupsPath } from "./paths/groups";
import { menusPath } from "./paths/menus";
import { projectsPath } from "./paths/projects";
import { tasksPath } from "./paths/tasks";
import { usersPath } from "./paths/users";

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
      Project,
      Task,
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
    ...projectsPath,
    ...tasksPath,
    ...usersPath,
  },
};
