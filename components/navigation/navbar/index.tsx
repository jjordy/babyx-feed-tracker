import BabyBottle from "@/components/elements/icons/baby-bottle";
import DropdownMenu from "@/components/elements/menu";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-12 fixed top-0 w-full bg-white shadow-xl font-black flex items-center">
      <div className="flex items-center container mx-auto">
        <BabyBottle className="w-6 h-6 mr-0.5" />
        <Link href="/" className="text-slate-700">
          BabyX Feed Tracker
        </Link>

        <div className="mr-auto"></div>
        <div className="flex items-center space-x-6 text-slate-500">
          <Cog8ToothIcon />
        </div>
      </div>
    </nav>
  );
}
