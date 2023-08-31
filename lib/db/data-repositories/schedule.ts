import { db } from "..";
import { Schedule, ScheduleUpdate, NewSchedule } from "../types";

export const findScheduleById = async (id: number) => {
  return await db
    .selectFrom("schedule")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

export const findSchedules = async (criteria: Partial<Schedule>) => {
  let query = db.selectFrom("schedule");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }
  if (criteria.name) {
    query = query.where("name", "=", criteria.name);
  }
  if (criteria.occurance) {
    query = query.where("occurance", "=", criteria.occurance);
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at);
  }

  return await query.selectAll().execute();
};

export async function updateSchedule(id: number, updateWith: ScheduleUpdate) {
  await db
    .updateTable("schedule")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createSchedule(schedule: NewSchedule) {
  return await db
    .insertInto("schedule")
    .values(schedule)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteSchedule(id: number) {
  return await db
    .deleteFrom("feeding")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
