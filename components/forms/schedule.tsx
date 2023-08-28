import { Feeding, Schedule } from "@/lib/db/types";
import Button from "../elements/button";
import { Input, Select } from "../elements/inputs";
import {
  createSchedule,
  updateSchedule,
} from "@/lib/db/data-repositories/schedule";
import { redirect } from "next/navigation";
import { findBabies } from "@/lib/db/data-repositories/baby";

export default async function ScheduleForm({
  schedule,
}: {
  schedule?: Schedule;
}) {
  const babies = await findBabies({});
  async function create(formData: FormData) {
    "use server";
    if (formData.get("occurance") && formData.get("name")) {
      try {
        const newSchedule = await createSchedule({
          occurance: formData.get("occurance")!.toString(),
          name: formData.get("name")!.toString(),
          owner_id: Number(formData.get("owner_id")!.toString()),
          updated_at: new Date().toDateString(),
        });
        redirect(`/babies/${newSchedule?.id}`);
      } catch (err: any) {
        console.log(err);
      }
    }
  }
  async function update(formData: FormData) {
    "use server";
    if (formData.get("amount")) {
      if (schedule) {
        try {
          await updateSchedule(schedule?.id, {
            occurance: formData.get("occurance")!.toString(),
            name: formData.get("name")!.toString(),
            updated_at: new Date(),
          });
          redirect(`/babies/${schedule?.id}`);
        } catch (err: any) {
          console.log(err);
        }
      }
    }
  }
  return (
    <form
      className="grid grid-cols-2 gap-8"
      action={schedule ? update : create}
    >
      <Input
        type="text"
        name="name"
        placeholder="Schedule Name..."
        defaultValue={schedule?.name}
      />
      <Input
        type="text"
        name="occurance"
        placeholder="Occurance / Frequency"
        defaultValue={schedule?.occurance}
      />
      <Select name="owner_id" className="col-span-2">
        {babies.map((baby) => (
          <option value={baby.id} key={`feeding_baby_option_${baby.id}`}>
            {baby.first_name} {baby.last_name}
          </option>
        ))}
      </Select>
      <Button type="submit" className="col-span-2">
        Submit
      </Button>
    </form>
  );
}
