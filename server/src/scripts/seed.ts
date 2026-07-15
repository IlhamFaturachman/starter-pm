import { initDb, Menu, Permission, Group, GroupPermission, User, UserGroup } from "../store/db";
import { seed } from "../store/seed";

async function main() {
  const force = process.argv.includes("--force");

  await initDb();

  if (force) {
    console.log("Force mode: clearing existing data...");
    await GroupPermission.destroy({ where: {} });
    await UserGroup.destroy({ where: {} });
    await Permission.destroy({ where: {} });
    await Menu.destroy({ where: {} });
    await Group.destroy({ where: {} });
  }

  await seed({ force });
  console.log("Done");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
