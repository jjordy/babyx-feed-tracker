import { createBaby } from "../data-repositories/baby";
import { createSchedule } from "../data-repositories/schedule";
import { createFeeding } from "../data-repositories/feeding";
import { addHours } from "date-fns";

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitraryNum(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

async function seedDB() {
  const linnea_birth_day = new Date();
  linnea_birth_day.setFullYear(2023);
  linnea_birth_day.setMonth(7);
  linnea_birth_day.setDate(14);
  linnea_birth_day.setHours(7);
  linnea_birth_day.setMinutes(9);

  const perry_birth_day = new Date();
  perry_birth_day.setFullYear(2023);
  perry_birth_day.setMonth(7);
  perry_birth_day.setDate(14);
  perry_birth_day.setHours(7);
  perry_birth_day.setMinutes(8);

  try {
    /**
     * Babies
     */
    const linnea = await createBaby({
      first_name: "Linnea",
      last_name: "Addison",
      birth_day: linnea_birth_day.toISOString(),
      gender: "Girl",
      birth_weight: 4.1,
    });

    console.log(linnea);

    const perry = await createBaby({
      first_name: "Perry",
      last_name: "Addison",
      birth_day: perry_birth_day.toISOString(),
      gender: "Girl",
      birth_weight: 4.1,
    });

    console.log(perry);
    /**
     * Schedules
     */
    const schedule = await createSchedule({
      name: "3x8",
      occurance: "Every 3 hrs",
      owner_id: perry.id!,
    });

    console.log(schedule);

    const feedings = Array.from(Array(14 * 8).keys());
    let startingAmount = 25;
    const feedingVariabilityAmount = 10;
    const feedingIncreaseRate = 2;
    const feedingsNeededForChanceOfIncrease = 4;

    let startingDate = new Date("August 14, 2023 09:00:00");

    console.log("Seeding Feedings");
    console.log(
      `Feedings ${feedings.length}, Starting Amount: ${startingAmount},
         Feeding Variability Amount: ${feedingVariabilityAmount},
         Feeding Increase Rate: ${feedingIncreaseRate},
         Feedings Needed for chance of increase: ${feedingsNeededForChanceOfIncrease}`,
    );
    for (const feeding of feedings) {
      if (feeding % feedingsNeededForChanceOfIncrease === 0) {
        startingAmount += feedingIncreaseRate;
      }

      const amount = getRandomArbitraryNum(
        startingAmount - 5,
        startingAmount + feedingVariabilityAmount,
      );
      console.log(feeding);
      await createFeeding({
        owner_id: perry.id!,
        schedule_id: schedule.id!,
        created_at:
          feeding === 0
            ? startingDate.toISOString()
            : addHours(startingDate, 3 * feeding).toISOString(),
        amount,
      });
    }
    startingAmount = 20;
    for (const feeding of feedings) {
      if (feeding % feedingsNeededForChanceOfIncrease === 0) {
        startingAmount += feedingIncreaseRate;
      }

      const amount = getRandomArbitraryNum(
        startingAmount - 5,
        startingAmount + feedingVariabilityAmount,
      );
      console.log(feeding);
      await createFeeding({
        owner_id: linnea.id!,
        schedule_id: schedule.id!,
        created_at:
          feeding === 0
            ? startingDate.toISOString()
            : addHours(startingDate, 3 * feeding).toISOString(),
        amount,
      });
    }
    console.log(`Created ${feedings.length} Feedings`);
    console.log("Finished running database seed");
  } catch (err) {
    console.log("Something went wrong seeding the db", err);
  }
}

seedDB();
