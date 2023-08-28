import { cn } from "@/lib";
import { findBabyById } from "@/lib/db/data-repositories/baby";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function BabyDetailPage({ params }: any) {
  const baby = await findBabyById(params.id);

  return (
    <main>
      <div className="flex space-x-4 items-center w-full">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl text-white",
            baby?.gender === "Boy" && "bg-sky-400",
            baby?.gender === "Girl" && "bg-pink-400",
          )}
        >
          {baby?.gender === "Boy" ? "B" : "G"}
        </div>
        <h1 className="text-6xl font-black">
          {baby?.first_name} {baby?.last_name}
        </h1>
        <Link
          href={`/babies/${baby?.id}/edit`}
          className="text-xl font-medium underline text-indigo-500 hover:text-indigo-600"
        >
          Edit
        </Link>
      </div>
      <div className="text-slate-400 font-medium">
        {formatDistanceToNow(new Date(baby?.birth_day!), {
          includeSeconds: true,
          addSuffix: false,
        })}{" "}
        old
      </div>
    </main>
  );
}
