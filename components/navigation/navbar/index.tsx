import BabyBottle from "@/components/elements/icons/baby-bottle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-12 shadow-xl font-black flex items-center">
      <div className="flex items-center container mx-auto">
        <BabyBottle className="w-6 h-6 mr-0.5" />
        <Link href="/" className="text-slate-700">
          BabyX Feed Tracker
        </Link>

        <div className="mr-auto"></div>
        <div className="flex items-center space-x-6 text-slate-500">
          <Link href="/feedings">Feedings</Link>
          <Link href="/schedules">Schedules</Link>
        </div>
      </div>
    </nav>
  );
}
