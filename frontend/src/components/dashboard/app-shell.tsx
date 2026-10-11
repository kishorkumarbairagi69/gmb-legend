"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const groups = [
  {
    label: "WORKSPACE",
    items: [
      { label: "Overview", href: "/app", icon: "▦" },
      { label: "Business listings", href: "/app/listings", icon: "◎" },
      { label: "Keyword research", href: "/app/keywords", icon: "⌕" },
    ],
  },
  {
    label: "LOCAL SEO",
    items: [
      { label: "Local rankings", href: "/app/rankings", icon: "↗" },
      { label: "Geo-grid ranker", href: "/app/geo-grid", icon: "▦" },
      { label: "Competitors", href: "/app/competitors", icon: "◫" },
      { label: "Market research", href: "/app/market-research", icon: "⌘" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "Reports & alerts", href: "/app/reports", icon: "▤" },
      { label: "Workspace settings", href: "/app/settings", icon: "⚙" },
    ],
  },
];

function BrandMark() {
  return (
    <span className="app-brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function AppShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    return href === "/app"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          className="app-sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`app-sidebar${mobileOpen ? " app-sidebar-open" : ""}`}>
        <Link className="app-brand" href="/app" onClick={() => setMobileOpen(false)}>
          <BrandMark />
          <span>GMB <strong>LEGEND</strong></span>
        </Link>

        <div className="app-workspace-switcher">
          <span className="workspace-avatar">W</span>
          <span className="workspace-copy">
            <strong>My workspace</strong>
            <small>Local workspace preview</small>
          </span>
          <span aria-hidden="true">⌄</span>
        </div>

        <nav className="app-navigation" aria-label="Application navigation">
          {groups.map((group) => (
            <div className="app-nav-group" key={group.label}>
              <p className="app-nav-label">{group.label}</p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`app-nav-link${isActive(item.href) ? " active" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="app-nav-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="app-sidebar-footer">
          <span className="workspace-avatar profile-avatar">GL</span>
          <span className="workspace-copy">
            <strong>Local preview</strong>
            <small>Authentication not configured</small>
          </span>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <button
            className="app-menu-button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="app-breadcrumb">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <strong>
              {groups.flatMap((group) => group.items).find((item) =>
                isActive(item.href),
              )?.label ?? "Overview"}
            </strong>
          </div>

          <div className="app-topbar-right">
            <span className="preview-status">
              <span />
              Local preview
            </span>
            <span className="topbar-avatar" aria-label="Preview profile">GL</span>
          </div>
        </header>

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
