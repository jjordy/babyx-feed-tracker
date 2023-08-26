import Button from "@/components/elements/button";
import { Input, Select } from "@/components/elements/inputs";
import BabyForm from "@/components/forms/baby";
import { cn } from "@/lib";
import { createBaby, findBabyById } from "@/lib/db/data-repositories/baby";
import { NewBaby } from "@/lib/db/types";
import { redirect } from "next/navigation";

export default async function BabyDetailPage({ params }: any) {
  const baby = await findBabyById(params.id);

  return (
    <main className="container mx-auto px-4 pt-20">
      <div className="flex space-x-4 items-center my-16">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl",
            baby?.gender === "Boy" && "bg-sky-400",
            baby?.gender === "Girl" && "bg-pink-400",
          )}
        >
          {baby?.gender === "Boy" ? "B" : "G"}
        </div>
        <h1 className="text-6xl font-black">
          {baby?.first_name} {baby?.last_name}
        </h1>
      </div>
      <BabyForm baby={baby} />
    </main>
  );
}
