"use client";

import { Baby } from "@/lib/db/types";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import s from "./index.module.css";
import { cn } from "@/lib";

export default function Sidebar({ babies }: { babies: Baby[] }) {
  const params = useParams();
  return (
    <>
      <div className=" text-slate-400 text-center my-2 px-2 font-black tracking-wide">
        Babies
      </div>
      {babies &&
        babies.map((baby) => (
          <Link
            href={`/babies/${baby.id}`}
            key={`sidebar_link_${baby.id}`}
            className={cn(s.link, Number(params?.id) === baby.id && s.active)}
          >
            {baby.first_name} {baby.last_name}
          </Link>
        ))}
    </>
  );
}
