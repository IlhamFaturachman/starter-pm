import { Op } from "sequelize";
import { sequelize } from "./connection";
import User from "./models/User";
import Project from "./models/Project";
import Task from "./models/Task";
import OTP from "./models/OTP";
import Group from "./models/Group";
import Menu from "./models/Menu";
import Permission from "./models/Permission";
import UserGroup from "./models/UserGroup";
import GroupPermission from "./models/GroupPermission";

// ── Associations ──────────────────────────────────────────
User.hasMany(Project, { foreignKey: "ownerId", as: "projects" });
Project.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

User.hasMany(Task, { foreignKey: "assigneeId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "assigneeId", as: "assignee" });

Project.hasMany(Task, { foreignKey: "projectId", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });
// ── RBAC Associations ─────────────────────────────────────
User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId", as: "groups" });
Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId", as: "users" });

Group.belongsToMany(Permission, { through: GroupPermission, foreignKey: "groupId", as: "permissions" });
Permission.belongsToMany(Group, { through: GroupPermission, foreignKey: "permissionId", as: "groups" });

Menu.hasMany(Permission, { foreignKey: "menuId", as: "permissions" });
Permission.belongsTo(Menu, { foreignKey: "menuId", as: "menu" });


// ── Init ──────────────────────────────────────────────────
export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};

export { sequelize, User, Project, Task, OTP, Menu, Group, Permission, UserGroup, GroupPermission };
