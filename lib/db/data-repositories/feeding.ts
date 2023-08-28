import { sql } from "kysely";
import { db } from "..";
import { FeedingUpdate, Feeding, NewFeeding } from "../types";
import { cache } from "react";

export const revalidate = 3600;

export const findFeedingById = cache(async (id: number) => {
  return await db
    .selectFrom("feeding")
    .where("feeding.id", "=", id)
    .innerJoin("baby as b", "b.id", "feeding.owner_id")
    .innerJoin("schedule as s", "s.id", "schedule_id")
    .select(["feeding.id as id", "amount", "feeding.created_at"])
    .select(() => sql<string>`b.first_name || ' ' || b.last_name`.as("name"))
    .executeTakeFirst();
});

export const findFeedings = cache(async (criteria: Partial<Feeding>) => {
  let query = db.selectFrom("feeding");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.amount) {
    query = query.where("amount", "=", criteria.amount);
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  return await query
    .innerJoin("baby as b", "b.id", "feeding.owner_id")
    .innerJoin("schedule as s", "s.id", "schedule_id")
    .select(["feeding.id as id", "amount as Amount (ML/CC)"])
    .select(() => sql<string>`b.first_name || ' ' || b.last_name`.as("Name"))
    .execute();
});

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
