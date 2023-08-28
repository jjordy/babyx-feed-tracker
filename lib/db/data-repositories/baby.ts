import { db } from "..";
import { BabyUpdate, Baby, NewBaby } from "../types";
import { cache } from "react";

export const revalidate = 3600;

export const findBabyById = cache(async (id: number) => {
  return await db
    .selectFrom("baby")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
});

export const findBabies = cache(async (criteria: Partial<Baby>) => {
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
});

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
