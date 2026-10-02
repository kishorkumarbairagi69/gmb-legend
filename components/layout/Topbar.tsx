"use client";

import {
  Bell,
  ChevronDown,
  HelpCircle,
  Plus,
  Search,
  Store,
} from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#E8EAF0] bg-white px-6">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC] px-3 text-[13px] font-semibold text-[#3D4150] transition-colors hover:border-[#D8D2EE] hover:bg-[#F0EAFF]"
          aria-label="Select business"
        >
          <Store size={16} className="text-[#6C3BFF]" />
          <span className="max-w-[180px] truncate">All Businesses</span>
          <ChevronDown size={15} className="text-[#8B8FA3]" />
        </button>

        <div className="hidden h-6 w-px bg-[#E8EAF0] md:block" />

        <div className="relative hidden w-[320px] lg:block">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9EAE]"
          />
          <input
            type="search"
            placeholder="Search businesses, locations, reviews..."
            className="h-10 w-full rounded-xl border border-[#E8EAF0] bg-[#F7F8FC] pl-10 pr-4 text-[13px] text-[#17172A] outline-none placeholder:text-[#9A9EAE] focus:border-[#C9B9FF] focus:bg-white focus:ring-2 focus:ring-[#F0EAFF]"
            aria-label="Global search"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl bg-[#6C3BFF] px-4 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#5125D9] sm:flex"
        >
          <Plus size={16} />
          Add
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#73788A] transition-colors hover:bg-[#F7F8FC] hover:text-[#17172A]"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#73788A] transition-colors hover:bg-[#F7F8FC] hover:text-[#17172A]"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#EF4444]" />
        </button>

        <button
          type="button"
          className="ml-1 flex h-10 items-center gap-2 rounded-xl px-2 transition-colors hover:bg-[#F7F8FC]"
          aria-label="Open account menu"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0EAFF] text-[12px] font-bold text-[#6C3BFF]">
            KK
          </span>
          <ChevronDown
            size={15}
            className="hidden text-[#8B8FA3] sm:block"
          />
        </button>
      </div>
    </header>
  );
}