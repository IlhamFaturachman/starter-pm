import bcrypt from "bcryptjs";
import { User, Project, Task, Menu, Permission, Group, GroupPermission, UserGroup } from "./db";

export async function seed(options?: { force?: boolean }) {
  const userCount = await User.count();
  if (userCount > 0 && !options?.force) return;


  const [user] = await User.findOrCreate({
    where: { email: "pram@example.com" },
    defaults: {
      email: "pram@example.com",
      name: "Pram",
      passwordHash: bcrypt.hashSync("password", 10),
      role: "admin",
    },
  });

  const project = await Project.create({
    name: "Project 1",
    description: "Project 1 description",
    status: "active",
    ownerId: user.id,
  });

  await Task.create({
    title: "Task 1",
    description: "Task 1 description",
    status: "todo",
    projectId: project.id,
    assigneeId: user.id,
    priority: "low",
    order: 1,
  });

  // ── Seed menus ────────────────────────────────────────
  const menuDefs = [
    { name: "Dashboard", route: "/dashboard", order: 0 },
    { name: "Projects", route: "/projects", order: 1 },
    { name: "Kanban", route: "/kanban", order: 2 },
    { name: "Users", route: "/users", order: 3 },
    { name: "Groups", route: "/groups", order: 4 },
    { name: "Menus", route: "/menus", order: 5 },
    { name: "Permissions", route: "/permissions", order: 6 },
  ];

  const menus = await Menu.bulkCreate(menuDefs, { ignoreDuplicates: true });
  const menuByName = Object.fromEntries(menus.map((m) => [m.name, m]));

  // ── Seed permissions (flexible, per-need) ─────────────
  const permissionDefs = [
    // Dashboard
    { menu: menuByName["Dashboard"], action: "read" as const, name: "View Dashboard" },
    // Projects
    { menu: menuByName["Projects"], action: "create" as const, name: "Create Project" },
    { menu: menuByName["Projects"], action: "read" as const, name: "View Projects" },
    { menu: menuByName["Projects"], action: "update" as const, name: "Edit Project" },
    { menu: menuByName["Projects"], action: "delete" as const, name: "Delete Project" },
    // Kanban
    { menu: menuByName["Kanban"], action: "read" as const, name: "View Kanban" },
    { menu: menuByName["Kanban"], action: "update" as const, name: "Edit Kanban" },
    // Users
    { menu: menuByName["Users"], action: "create" as const, name: "Create User" },
    { menu: menuByName["Users"], action: "read" as const, name: "View Users" },
    { menu: menuByName["Users"], action: "update" as const, name: "Edit User" },
    { menu: menuByName["Users"], action: "delete" as const, name: "Delete User" },
    // Groups
    { menu: menuByName["Groups"], action: "create" as const, name: "Create Group" },
    { menu: menuByName["Groups"], action: "read" as const, name: "View Groups" },
    { menu: menuByName["Groups"], action: "update" as const, name: "Edit Group" },
    { menu: menuByName["Groups"], action: "delete" as const, name: "Delete Group" },
    // Menus
    { menu: menuByName["Menus"], action: "read" as const, name: "View Menus" },
    // Permissions
    { menu: menuByName["Permissions"], action: "read" as const, name: "View Permissions" },
  ];

  const permissions = permissionDefs.map((def) => ({
    key: `${def.menu.name.toLowerCase()}.${def.action}`,
    name: def.name,
    menuId: def.menu.id,
    action: def.action,
  }));

  await Permission.bulkCreate(permissions, { ignoreDuplicates: true });

  // ── Seed admin group with all permissions ─────────────
  const adminGroup = await Group.create({
    name: "admin",
    description: "Full access to all features",
  });

  const allPermissions = await Permission.findAll();
  await GroupPermission.bulkCreate(
    allPermissions.map((p) => ({
      groupId: adminGroup.id,
      permissionId: p.id,
    })),
  );

  // assign admin user to admin group
  await UserGroup.create({ userId: user.id, groupId: adminGroup.id });



  console.log("Database seeded");
}
