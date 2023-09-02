import Divider from "@/components/elements/divider";
import Heading from "@/components/elements/heading";
import BabyForm from "@/components/forms/baby";
import { findBabyById } from "@/lib/db/data-repositories/baby";

export default async function EditBabyPage({ params }: any) {
  const baby = await findBabyById(params.id!);
  return (
    <>
      <Heading as="h1">Edit Baby</Heading>
      <Divider />
      <div>
        <BabyForm baby={baby} />
      </div>
    </>
  );
}
