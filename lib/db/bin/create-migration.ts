import fs from "node:fs/promises";
import path from "node:path";

const [_tsNode, _rootPath, ...args] = process.argv;

const argsObj = args.reduce(
  (acc, curr) => {
    let firstPart = curr.replace("--", "").split("--")[0];
    let key = firstPart.split("=")[0];
    acc[key] = curr.split("=")[1];
    return acc;
  },
  {} as Record<string, string>,
);

const fileContent = `import { Kysely, sql } from "kysely";
import { DB } from "kysely-codegen";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("baby")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text")
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql\`CURRENT_TIMESTAMP\`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("baby").execute();
}`;

async function createMigration() {
  console.log(
    path.join(
      __dirname,
      "..",
      "migrations",
      `${Date.parse(new Date().toUTCString()) / 1000}${
        argsObj.name ? `_${argsObj.name}` : ""
      }.ts`,
    ),
  );
  try {
    await fs.writeFile(
      path.join(
        __dirname,
        "..",
        "migrations",
        `${Date.parse(new Date().toUTCString()) / 1000}${
          argsObj.name ? `_${argsObj.name}` : ""
        }.ts`,
      ),
      fileContent,
    );
  } catch (err) {}
}

createMigration();
