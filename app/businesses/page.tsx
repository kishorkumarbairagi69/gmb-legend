import { Building2, MapPin, ShieldCheck, UserRoundPlus } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { KPICard } from "@/components/ui/KPICard";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Business = {
  id: string;
  name: string;
  locations: number;
  googleAccount: string;
  health: number;
  status: "Connected" | "Needs Attention" | "Disconnected";
};

const businesses: Business[] = [
  {
    id: "downtown-group",
    name: "Downtown Group",
    locations: 48,
    googleAccount: "downtown@example.com",
    health: 92,
    status: "Connected",
  },
  {
    id: "northstar-hospitality",
    name: "Northstar Hospitality",
    locations: 36,
    googleAccount: "northstar@example.com",
    health: 84,
    status: "Needs Attention",
  },
  {
    id: "acme-local-services",
    name: "Acme Local Services",
    locations: 28,
    googleAccount: "acme@example.com",
    health: 78,
    status: "Connected",
  },
  {
    id: "citywide-retail",
    name: "Citywide Retail",
    locations: 16,
    googleAccount: "citywide@example.com",
    health: 61,
    status: "Disconnected",
  },
];

const columns: DataTableColumn<Business>[] = [
  {
    key: "business",
    header: "Business",
    render: (business) => (
      <div>
        <p className="font-semibold text-text-primary">{business.name}</p>
        <p className="mt-1 text-secondary">{business.id}</p>
      </div>
    ),
  },
  {
    key: "locations",
    header: "Locations",
    render: (business) => (
      <span className="font-medium">{business.locations}</span>
    ),
  },
  {
    key: "googleAccount",
    header: "Google Account",
    render: (business) => (
      <span className="text-text-secondary">
        {business.googleAccount}
      </span>
    ),
  },
  {
    key: "health",
    header: "Profile Health",
    className: "min-w-[180px]",
    render: (business) => (
      <ProgressBar value={business.health} showValue />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (business) => {
  const statusMap = {
    Connected: "success",
    "Needs Attention": "warning",
    Disconnected: "error",
  } as const;

  return (
    <StatusBadge status={statusMap[business.status]}>
      {business.status}
    </StatusBadge>
  );
},
  },
  {
    key: "actions",
    header: "Actions",
    render: (business) => (
      <a
        href={`/businesses/${business.id}`}
        className="text-button text-primary hover:text-primary-dark"
      >
        View
      </a>
    ),
  },
];

export default function BusinessesPage() {
  return (
    <AppShell>
      <main className="page-padding">
        <div className="mx-auto w-full max-w-[1600px]">
          <header className="mb-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-secondary">Business Management</p>
                <h1 className="text-page-title text-text-primary">
                  Businesses
                </h1>
                <p className="text-secondary mt-2 max-w-2xl">
                  Manage businesses, Google accounts, and their connected
                  locations from one place.
                </p>
              </div>

              <PrimaryButton>
  <UserRoundPlus size={18} />
  Add Business
</PrimaryButton>
            </div>
          </header>

          <section
            aria-label="Business summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <KPICard
              label="Total Businesses"
              value="4"
              supportingText="Across the organization"
              icon={<Building2 size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Total Locations"
              value="128"
              supportingText="Across all businesses"
              icon={<MapPin size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Connected Accounts"
              value="3"
              supportingText="Google accounts connected"
              icon={<UserRoundPlus size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Average Health"
              value="79%"
              supportingText="Average profile health"
              icon={<ShieldCheck size={20} strokeWidth={2} />}
            />
          </section>

          <section className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-card">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-section-title text-text-primary">
                  All Businesses
                </h2>
                <p className="text-secondary mt-1">
                  Search and review connected business accounts.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="business-search">
                  Search businesses
                </label>

                <input
                  id="business-search"
                  type="search"
                  placeholder="Search businesses..."
                  className="h-10 rounded-xl border border-border bg-white px-3 text-body text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
                />

                <select
                  aria-label="Filter businesses by status"
                  className="h-10 rounded-xl border border-border bg-white px-3 text-body text-text-primary outline-none focus:border-primary"
                  defaultValue="all"
                >
                  <option value="all">All statuses</option>
                  <option value="Connected">Connected</option>
                  <option value="Needs Attention">Needs Attention</option>
                  <option value="Disconnected">Disconnected</option>
                </select>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={businesses}
              rowKey={(business) => business.id}
            />
          </section>
        </div>
      </main>
    </AppShell>
  );
}
