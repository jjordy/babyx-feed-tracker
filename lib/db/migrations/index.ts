import { Kysely, sql } from "kysely";
import { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("baby")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text")
    .addColumn("gender", "text", (col) => col.notNull())
    .addColumn("birth_day", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db.schema
    .createTable("schedule")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .addColumn("owner_id", "integer", (col) =>
      col.references("baby.id").onDelete("cascade").notNull(),
    )
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex("schedule_owner_id_index")
    .on("schedule")
    .column("owner_id")
    .execute();

  await db.schema
    .createTable("feeding")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("amount", "integer", (col) => col.notNull().unique())
    .addColumn("owner_id", "integer", (col) =>
      col.references("baby.id").onDelete("cascade").notNull(),
    )
    .addColumn("schedule_id", "integer", (col) =>
      col.references("schedule.id").onDelete("cascade").notNull(),
    )
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex("feeding_owner_id_index")
    .on("feeding")
    .column("owner_id")
    .execute();

  await db.schema
    .createIndex("feeding_schedule_id_index")
    .on("feeding")
    .column("schedule_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("baby").execute();
  await db.schema.dropTable("schedule").execute();
  await db.schema.dropTable("feeding").execute();
}
