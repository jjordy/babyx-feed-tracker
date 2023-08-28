import { Insertable, Selectable, Updateable } from "kysely";

import {
  Baby as BabyTable,
  Schedule as ScheduleTable,
  Feeding as FeedingTable,
} from "kysely-codegen";

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
