"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

import { navigationItems } from "./navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-[#E8EAF0] bg-white transition-all duration-200 ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      <div className="flex h-[72px] items-center border-b border-[#E8EAF0] px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#6C3BFF] text-white shadow-sm">
            <MapPin size={19} strokeWidth={2.5} />
          </div>

          {!collapsed && (
            <div className="leading-none">
              <div className="text-[15px] font-bold tracking-tight text-[#17172A]">
                GMB Legend
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8B8FA3]">
                Local SEO
              </div>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isActive =
              item.href === pathname ||
              item.children?.some((child) => child.href === pathname);

            if (!hasChildren && item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex h-10 items-center gap-3 rounded-xl px-3 text-[13px] font-semibold transition-colors ${
                    isActive
                      ? "bg-[#F0EAFF] text-[#6C3BFF]"
                      : "text-[#5F6475] hover:bg-[#F7F8FC] hover:text-[#17172A]"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            }

            return (
              <SidebarGroup
                key={item.label}
                label={item.label}
                collapsed={collapsed}
                active={Boolean(isActive)}
                children={item.children ?? []}
                pathname={pathname}
              />
            );
          })}
        </div>
      </nav>

      <div className="border-t border-[#E8EAF0] p-3">
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="flex h-10 w-full items-center justify-center rounded-xl text-[12px] font-semibold text-[#8B8FA3] transition-colors hover:bg-[#F7F8FC] hover:text-[#17172A]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </aside>
  );
}

type SidebarGroupProps = {
  label: string;
  collapsed: boolean;
  active: boolean;
  children: {
    label: string;
    href?: string;
  }[];
  pathname: string;
};

function SidebarGroup({
  label,
  collapsed,
  active,
  children,
  pathname,
}: SidebarGroupProps) {
  const [open, setOpen] = useState(active);

  if (collapsed) {
    return (
      <div className="flex h-10 items-center justify-center rounded-xl text-[13px] font-semibold text-[#5F6475]">
        <span>{label.charAt(0)}</span>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex h-10 w-full items-center justify-between rounded-xl px-3 text-left text-[13px] font-semibold transition-colors ${
          active
            ? "text-[#6C3BFF]"
            : "text-[#5F6475] hover:bg-[#F7F8FC] hover:text-[#17172A]"
        }`}
        aria-expanded={open}
      >
        <span>{label}</span>
        {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
      </button>

      {open && (
        <div className="ml-3 space-y-1 border-l border-[#E8EAF0] pl-3">
          {children.map((child) => {
            if (!child.href) {
              return null;
            }

            const childActive = child.href === pathname;

            return (
              <Link
                key={child.label}
                href={child.href}
                className={`flex min-h-9 items-center rounded-lg px-3 py-2 text-[12px] font-medium transition-colors ${
                  childActive
                    ? "bg-[#F0EAFF] text-[#6C3BFF]"
                    : "text-[#73788A] hover:bg-[#F7F8FC] hover:text-[#17172A]"
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}