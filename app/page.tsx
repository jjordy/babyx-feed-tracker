import Button from "@/components/elements/button";
import Heading from "@/components/elements/heading";
import Table from "@/components/elements/table";
import { cn } from "@/lib";
import { findBabies } from "@/lib/db/data-repositories/baby";
import { findFeedings } from "@/lib/db/data-repositories/feeding";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function Home() {
  const feedings = await findFeedings({});
  const feedingsRows = feedings?.map(({ id, ...rest }) => ({
    ...rest,
    Details: () => (
      <Link href={`/feedings/${id}`} className="underline text-indigo-500">
        Feeding {id}
      </Link>
    ),
  }));
  console.log(feedingsRows);
  const babies = await findBabies({});
  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="space-y-8">
          <Heading>Feedings</Heading>
          {feedingsRows && feedingsRows.length > 0 ? (
            <Table data={feedingsRows} />
          ) : (
            <div className="text-center font-black text-slate-200">
              No Feedings Yet
            </div>
          )}
        </div>
        <div className="space-y-8">
          <Heading>Babies</Heading>
          <Table data={babies} />
          <Button
            as={Link}
            href="/babies/add"
            className="bg-white rounded shadow-xl px-4 py-3 text-slate-500 flex items-center justify-center font-semibold uppercase tracking-wide"
          >
            Add a baby
          </Button>
        </div>
      </div>
    </>
  );
}
