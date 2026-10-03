import { MapPin, Star } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TrendBadge } from "@/components/ui/TrendBadge";

type LocationRow = {
  id: string;
  location: string;
  city: string;
  rating: string;
  health: string;
  status: "success" | "warning" | "error";
  trend: "up" | "down" | "neutral";
  change: string;
};

const locations: LocationRow[] = [
  {
    id: "loc-001",
    location: "Downtown Store",
    city: "New Delhi",
    rating: "4.8",
    health: "94%",
    status: "success",
    trend: "up",
    change: "+6.2%",
  },
  {
    id: "loc-002",
    location: "Central Market",
    city: "Mumbai",
    rating: "4.5",
    health: "81%",
    status: "warning",
    trend: "up",
    change: "+2.4%",
  },
  {
    id: "loc-003",
    location: "West End",
    city: "Bengaluru",
    rating: "3.9",
    health: "62%",
    status: "error",
    trend: "down",
    change: "-4.8%",
  },
  {
    id: "loc-004",
    location: "City Center",
    city: "Pune",
    rating: "4.7",
    health: "88%",
    status: "success",
    trend: "neutral",
    change: "0.0%",
  },
];

const columns: DataTableColumn<LocationRow>[] = [
  {
    key: "location",
    header: "Location",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
          <MapPin size={16} />
        </div>

        <div>
          <div className="font-semibold text-text-primary">
            {row.location}
          </div>
          <div className="text-secondary">
            {row.city}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "rating",
    header: "Rating",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <Star size={15} className="text-orange" />
        <span>{row.rating}</span>
      </div>
    ),
  },
  {
    key: "health",
    header: "Profile Health",
    render: (row) => row.health,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <StatusBadge status={row.status}>
        {row.status === "success"
          ? "Healthy"
          : row.status === "warning"
            ? "Needs Attention"
            : "Failed"}
      </StatusBadge>
    ),
  },
  {
    key: "trend",
    header: "Visibility",
    render: (row) => (
      <TrendBadge trend={row.trend} value={row.change} />
    ),
  },
];

export default function Home() {
  return (
    <AppShell>
      <div className="page-padding">
        <div className="card-padding rounded-[20px] border border-border bg-white shadow-card">
          <p className="text-secondary uppercase tracking-[0.12em] text-primary">
            F3.5 Component Verification
          </p>

          <h1 className="text-page-title mt-2">
            Data Table
          </h1>

          <p className="text-body mt-3 max-w-2xl text-text-secondary">
            Temporary verification page for the reusable data table component
            with custom cells, statuses, and trend indicators.
          </p>

          <section className="mt-8">
            <h2 className="text-section-title">
              Location Data
            </h2>

            <div className="mt-4">
              <DataTable
                columns={columns}
                data={locations}
                rowKey={(row) => row.id}
              />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-section-title">
              Empty State
            </h2>

            <div className="mt-4">
              <DataTable
                columns={columns}
                data={[]}
                rowKey={(row) => row.id}
                emptyMessage="No locations found."
              />
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}