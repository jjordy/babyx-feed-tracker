import Heading from "@/components/elements/heading";
import BabyBottle from "@/components/elements/icons/baby-bottle";
import { findFeedingById } from "@/lib/db/data-repositories/feeding";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function BabyDetailPage({ params }: any) {
  const feeding = await findFeedingById(params.id);
  return (
    <>
      <div className="flex space-x-4 items-center w-full">
        <Heading as="h1">Feeding {params.id}</Heading>
        <Link
          href={`/feedings/${feeding?.id}/edit`}
          className="text-xl font-medium underline text-indigo-500 hover:text-indigo-600"
        >
          Edit
        </Link>
      </div>
      <div className="w-full p-16 border-2 border-slate-400 rounded">
        <div className="flex items-center justify-center space-x-4">
          <Heading as="h2">
            {feeding?.name} | {feeding?.amount} ML
          </Heading>

          <BabyBottle />
        </div>
        <div className="text-center font-light text-xl">
          {feeding?.created_at &&
            format(new Date(feeding?.created_at), "MM/dd/yyyy h:mm:ss b")}
        </div>
      </div>
    </>
  );
}
