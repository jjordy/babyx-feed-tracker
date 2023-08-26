import { Baby, NewBaby } from "@/lib/db/types";
import Button from "../elements/button";
import { Input, Select } from "../elements/inputs";
import { createBaby, updateBaby } from "@/lib/db/data-repositories/baby";
import { redirect } from "next/navigation";

export default function BabyForm({ baby }: { baby?: Baby }) {
  async function create(formData: FormData) {
    "use server";
    if (
      formData.get("first_name") &&
      formData.get("last_name") &&
      formData.get("gender")
    ) {
      try {
        const newBaby = await createBaby({
          first_name: formData.get("first_name")!.toString(),
          last_name: formData.get("last_name")!.toString(),
          gender: formData.get("gender")!.toString() as NewBaby["gender"],
          birth_day: formData.get("birth_day")?.toString(),
        });
        redirect(`/babies/${newBaby?.id}`);
      } catch (err: any) {
        console.log(err);
      }
    }
  }
  async function update(formData: FormData) {
    "use server";
    if (
      formData.get("first_name") &&
      formData.get("last_name") &&
      formData.get("gender") &&
      formData.get("birth_day")
    ) {
      if (baby) {
        try {
          await updateBaby(baby?.id, {
            first_name: formData.get("first_name")!.toString(),
            last_name: formData.get("last_name")!.toString(),
            gender: formData.get("gender")!.toString() as NewBaby["gender"],
            birth_day: new Date(formData.get("birth_day")!.toString()),
          });
          redirect(`/babies/${baby?.id}`);
        } catch (err: any) {
          console.log(err);
        }
      }
    }
  }
  return (
    <form className="grid grid-cols-2 gap-8" action={baby ? update : create}>
      <Input
        type="text"
        name="first_name"
        placeholder="First name..."
        defaultValue={baby?.first_name}
      />
      <Input
        type="text"
        name="last_name"
        placeholder="Last name..."
        defaultValue={baby?.last_name}
      />
      <Select
        name="gender"
        placeholder="Gender..."
        className="col-span-2"
        defaultValue={baby?.gender}
      >
        <option value="Boy">Baby Boy</option>
        <option value="Girl">Baby Girl</option>
        <option value="Other">Baby Other</option>
      </Select>
      <Input
        type="datetime-local"
        name="birth_day"
        placeholder="Birthday..."
        className="col-span-2"
        defaultValue={baby?.birth_day}
      />
      <Button type="submit" className="col-span-2">
        Submit
      </Button>
    </form>
  );
}
