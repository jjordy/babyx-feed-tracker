import BabyForm from "@/components/forms/baby";

export default async function CreateBaby() {
  return (
    <>
      <h1 className="text-6xl font-thin tracking-tight text-slate-900">
        Add a baby
      </h1>
      <hr className="my-4" />
      <BabyForm />
    </>
  );
}
