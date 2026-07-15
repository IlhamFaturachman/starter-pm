import { Op } from "sequelize";
import { sequelize } from "./connection";
import User from "./models/User";
import Project from "./models/Project";
import Task from "./models/Task";
import OTP from "./models/OTP";

// ── Associations ──────────────────────────────────────────
User.hasMany(Project, { foreignKey: "ownerId", as: "projects" });
Project.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

User.hasMany(Task, { foreignKey: "assigneeId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "assigneeId", as: "assignee" });

Project.hasMany(Task, { foreignKey: "projectId", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

// ── OTP expiry cleaner ────────────────────────────────────
const CLEANER_INTERVAL = 60 * 1000;
setInterval(async () => {
  try {
    await OTP.destroy({ where: { expiresAt: { [Op.lt]: new Date() } } });
  } catch (e) {
    console.error("OTP cleaner failed", e);
  }
}, CLEANER_INTERVAL);

// ── Init ──────────────────────────────────────────────────
export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

export { sequelize, User, Project, Task, OTP };
