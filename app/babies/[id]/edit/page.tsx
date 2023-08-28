import BabyForm from "@/components/forms/baby";
import { findBabyById } from "@/lib/db/data-repositories/baby";

export default async function EditBabyPage({ params }: any) {
  const baby = await findBabyById(params.id!);
  return (
    <div className="w-full">
      <BabyForm baby={baby} />
    </div>
  );
}
