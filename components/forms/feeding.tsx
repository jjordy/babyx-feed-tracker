import { Feeding } from "@/lib/db/types";
import Button from "../elements/button";
import { Input, Select } from "../elements/inputs";
import {
  createFeeding,
  updateFeeding,
} from "@/lib/db/data-repositories/feeding";
import { redirect } from "next/navigation";
import { findBabies } from "@/lib/db/data-repositories/baby";

export default async function FeedingForm({ feeding }: { feeding?: Feeding }) {
  const babies = await findBabies({});
  async function create(formData: FormData) {
    "use server";
    if (formData.get("amount")) {
      try {
        const newfeeding = await createFeeding({
          amount: Number(formData.get("amount")!.toString()),
          schedule_id: 1,
          owner_id: Number(formData.get("owner_id")?.toString()),
          updated_at: new Date().toDateString(),
        });
        redirect(`/babies/${newfeeding?.id}`);
      } catch (err: any) {
        console.log(err);
      }
    }
  }
  async function update(formData: FormData) {
    "use server";
    if (formData.get("amount")) {
      if (feeding) {
        try {
          await updateFeeding(feeding?.id, {
            amount: Number(formData.get("amount")!.toString()) || undefined,
            schedule_id: 1,
            owner_id: Number(formData.get("owner_id")?.toString()),
            updated_at: new Date(),
          });
          redirect(`/babies/${feeding?.id}`);
        } catch (err: any) {
          console.log(err);
        }
      }
    }
  }
  return (
    <form className="grid grid-cols-2 gap-8" action={feeding ? update : create}>
      <Input
        type="text"
        name="amount"
        placeholder="Amount in CC/ML"
        defaultValue={feeding?.amount}
      />
      <Select name="owner_id">
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
