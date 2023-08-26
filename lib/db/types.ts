import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  baby: BabyTable;
  schedule: ScheduleTable;
  feeding: FeedingTable;
}

export interface BabyTable {
  id: Generated<number>;
  first_name: string;
  gender: "Boy" | "Girl" | "Other";
  birth_day: ColumnType<Date, string | undefined>;
  last_name: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface ScheduleTable {
  id: Generated<number>;
  name: string;
  occurance: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface FeedingTable {
  id: Generated<number>;
  amount: number;
  finished: ColumnType<Boolean, false, never>;
  created_at: ColumnType<Date, string | undefined, never>;
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type Baby = Selectable<BabyTable>;
export type NewBaby = Insertable<BabyTable>;
export type BabyUpdate = Updateable<BabyTable>;
export type Schedule = Selectable<ScheduleTable>;
export type NewSchedule = Insertable<ScheduleTable>;
export type ScheduleUpdate = Updateable<ScheduleTable>;
export type Feeding = Selectable<FeedingTable>;
export type NewFeeding = Insertable<FeedingTable>;
export type FeedingUpdate = Updateable<FeedingTable>;
