import LineChart from "@/components/charts/line";
import Button from "@/components/elements/button";
import Divider from "@/components/elements/divider";
import Heading from "@/components/elements/heading";
import Table from "@/components/elements/table";
import Tabs from "@/components/elements/tabs";
import { findBabies, findBabiesMetrics } from "@/lib/db/data-repositories/baby";
import { findFeedings } from "@/lib/db/data-repositories/feeding";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";

async function getHomepageData() {
  const babies = await findBabies({});
  const metrics = await findBabiesMetrics();
  const feedings = await findFeedings({});
  return {
    babies,
    feedings,
    metrics,
  };
}

export default async function Home() {
  const { babies, feedings, metrics } = await getHomepageData();
  const feedingsRows = feedings?.map(({ id, created_at, ...rest }) => ({
    ...rest,
    created_at: format(new Date(created_at), "MM/dd/yyyy"),
    Details: () => (
      <Link href={`/feedings/${id}`} className="underline text-indigo-300">
        Feeding {id}
      </Link>
    ),
  }));

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <Tabs
          items={{
            "Latest Metrics": (
              <div className="w-full">
                <Heading as="h4">Feeding totals over time</Heading>
                <div className="px-32">
                  <LineChart
                    yLabel="ml/cc"
                    data={{
                      labels: metrics[0].labels.map((v) =>
                        format(new Date(v.created_at), "MM/dd/yyyy"),
                      ),
                      datasets: metrics?.map((baby, id) => ({
                        label: `${baby.first_name} ${baby.last_name}`,
                        borderColor:
                          id % 2 === 0
                            ? "rgb(255, 99, 132)"
                            : "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        data: baby.datasets.map((d) => d.amount),
                      })),
                    }}
                  />
                </div>
              </div>
            ),
            Feedings: (
              <div className="space-y-8">
                <Heading as="h4">Feedings</Heading>
                {feedingsRows && feedingsRows.length > 0 ? (
                  <div className="px-32">
                    <Table data={feedingsRows} />
                  </div>
                ) : (
                  <div className="text-center font-black text-slate-200">
                    No Feedings Yet
                  </div>
                )}
              </div>
            ),
            Babies: (
              <div className="space-y-8">
                <Heading as="h4">Babies</Heading>
                {babies && babies.length > 0 ? (
                  <div className="px-32">
                    <Table data={babies} />
                  </div>
                ) : (
                  <div className="text-center font-black text-slate-200">
                    No Babies Yet
                  </div>
                )}
                <div className="flex items-center justify-end">
                  <Button as={Link} href="/babies/add">
                    Add a baby
                  </Button>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
