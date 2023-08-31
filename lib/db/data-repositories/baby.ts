import { db } from "..";
import { BabyUpdate, Baby, NewBaby } from "../types";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/sqlite";

export const findBabyById = async (id: number) => {
  return await db
    .selectFrom("baby")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

export const findBabiesMetrics = async () => {
  return await db
    .selectFrom("baby")
    .selectAll()
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("feeding")
          .select("feeding.created_at")
          .whereRef("baby.id", "=", "feeding.owner_id")
          .orderBy("feeding.created_at asc"),
      ).as("labels"),
      jsonArrayFrom(
        eb
          .selectFrom("feeding")
          .select("feeding.amount")
          .whereRef("baby.id", "=", "feeding.owner_id")
          .orderBy("feeding.created_at asc"),
      ).as("datasets"),
    ])
    .execute();
};

export const findBabies = async (criteria: Partial<Baby>) => {
  let query = db.selectFrom("baby");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.first_name) {
    query = query.where("first_name", "=", criteria.first_name);
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      "last_name",
      criteria.last_name === null ? "is" : "=",
      criteria.last_name,
    );
  }

  if (criteria.gender) {
    query = query.where("gender", "=", criteria.gender);
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  return await query.selectAll().execute();
};

export async function updateBaby(id: number, updateWith: BabyUpdate) {
  await db.updateTable("baby").set(updateWith).where("id", "=", id).execute();
}

export async function createBaby(Baby: NewBaby) {
  return await db
    .insertInto("baby")
    .values(Baby)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteBaby(id: number) {
  return await db
    .deleteFrom("baby")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
