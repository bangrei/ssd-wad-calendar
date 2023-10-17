import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row md:gap-0 items-center justify-between p-4 shadow-lg bg-white/20 text-slate-700 md:px-20 md:space-x-8 rounded-lg overflow-hidden">
      <Link
        href="/"
        className="flex items-center flex-col gap-2 hover:opacity-80"
      >
        <div className="text-xl font-extrabold flex items-center gap-2">
          <CalendarDaysIcon width={24} height={24} />
          <span>My Calendar</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
