import { cn } from "@/lib";
import { findBabies } from "@/lib/db/data-repositories/baby";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function Home() {
  const babies = await findBabies({});
  console.log(babies);
  return (
    <main className="flex min-h-screen">
      <section
        id="cta"
        className="bg-gradient-to-tr from-sky-300 to-fuchsia-400 h-[400px] w-full flex items-center justify-center"
      >
        {babies && babies.length > 0 && (
          <div className="grid grid-cols-2 gap-8">
            {babies.map((baby) => (
              <Link
                href={`/babies/${baby.id}`}
                key={`baby_x_${baby.id}`}
                className={cn(
                  "p-8 h-64 w-64  rounded-full shadow-xl flex flex-col items-center justify-center",
                  baby.gender === "Girl" && "bg-fuchsia-400",
                  baby.gender === "Boy" && "bg-sky-400",
                )}
              >
                <div className="text-2xl font-black">
                  {baby.first_name} {baby.last_name}
                </div>
                <div className="font-light tracking-wide">
                  {formatDistanceToNow(new Date(baby?.birth_day))} Old
                </div>
              </Link>
            ))}
          </div>
        )}
        {babies && babies.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-16">
            <h1 className="text-6xl font-black uppercase gradient-to-tr from-sky-300 to-fuchsia-400 tracking-tighter">
              No Babies!
            </h1>
            <Link
              href="/babies/add"
              className="bg-white rounded shadow-xl px-4 py-3 text-slate-500 flex items-center justify-center font-semibold uppercase tracking-wide"
            >
              Add a baby
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
