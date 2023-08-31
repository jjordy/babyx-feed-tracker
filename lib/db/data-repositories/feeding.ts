import { sql } from "kysely";
import { db } from "..";
import { FeedingUpdate, Feeding, NewFeeding } from "../types";

export const findFeedingById = async (id: number) => {
  return await db
    .selectFrom("feeding")
    .where("id", "=", id)
    .select(["id", "owner_id", "amount", "created_at"])
    .executeTakeFirst();
};

export const findFeedings = async (criteria: Partial<Feeding>) => {
  let query = db.selectFrom("feeding");

  if (criteria.id) {
    query = query.where("feeding.id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.amount) {
    query = query.where("amount", "=", criteria.amount);
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  return await query
    .select(["id", "owner_id", "amount", "created_at"])
    .orderBy("created_at", "desc")
    .limit(10)
    .execute();
};

export async function updateFeeding(id: number, updateWith: FeedingUpdate) {
  await db
    .updateTable("feeding")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createFeeding(feeding: NewFeeding) {
  return await db
    .insertInto("feeding")
    .values(feeding)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteFeeding(id: number) {
  return await db
    .deleteFrom("feeding")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
