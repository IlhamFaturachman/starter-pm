import bcrypt from "bcryptjs";
import { User, Project, Task } from "./db";

export async function seed() {
  const userCount = await User.count();
  if (userCount > 0) return;

  const user = await User.create({
    name: "Pram",
    email: "pram@example.com",
    passwordHash: bcrypt.hashSync("password", 10),
    role: "admin",
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

  console.log("Database seeded");
}
