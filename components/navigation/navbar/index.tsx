import BabyBottle from "@/components/elements/icons/baby-bottle";
import DropdownMenu from "@/components/elements/menu";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-12 fixed top-0 w-full bg-white dark:bg-slate-900  first-letter:shadow-xl font-black flex items-center">
      <div className="flex items-center justify-center container mx-auto">
        <BabyBottle className="w-6 h-6 mr-0.5" />
        <Link href="/" className="text-slate-700 dark:text-white">
          BabyX Feed Tracker
        </Link>
      </div>
    </nav>
  );
}
