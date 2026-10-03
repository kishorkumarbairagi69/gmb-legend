import { AreaChart } from "@/components/charts/AreaChart";
import { AppShell } from "@/components/layout/AppShell";
import { KPICard } from "@/components/ui/KPICard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { TrendBadge } from "@/components/ui/TrendBadge";
import {
  Building2,
  Eye,
  MessageSquare,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  DataTable,
  type DataTableColumn,
} from "@/components/ui/DataTable";

const dashboardKpis = [
  {
    label: "Total Locations",
    value: "128",
    supportingText: "Across all businesses",
    trend: {
      type: "up" as const,
      value: "+8 this month",
    },
    icon: Building2,
  },
  {
    label: "Profile Health",
    value: "87%",
    supportingText: "Average health score",
    trend: {
      type: "up" as const,
      value: "+4.2%",
    },
    icon: ShieldCheck,
  },
  {
    label: "Reviews",
    value: "4,286",
    supportingText: "Across all locations",
    trend: {
      type: "up" as const,
      value: "+12.4%",
    },
    icon: MessageSquare,
  },
  {
    label: "Search Visibility",
    value: "76",
    supportingText: "Average visibility score",
    trend: {
      type: "up" as const,
      value: "+6.8%",
    },
    icon: Eye,
  },
];

const performanceData = [
  { label: "Jan", value: 61 },
  { label: "Feb", value: 66 },
  { label: "Mar", value: 64 },
  { label: "Apr", value: 72 },
  { label: "May", value: 78 },
  { label: "Jun", value: 87 },
];

const reviewTrendData = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 58 },
  { label: "Mar", value: 51 },
  { label: "Apr", value: 73 },
  { label: "May", value: 66 },
  { label: "Jun", value: 84 },
];

type RankingRow = {
  keyword: string;
  position: number;
  change: string;
  visibility: string;
};

const rankingRows: RankingRow[] = [
  {
    keyword: "best local seo agency",
    position: 3,
    change: "+4",
    visibility: "92%",
  },
  {
    keyword: "google business profile management",
    position: 5,
    change: "+2",
    visibility: "86%",
  },
  {
    keyword: "local seo services",
    position: 7,
    change: "+5",
    visibility: "79%",
  },
  {
    keyword: "gmb management",
    position: 11,
    change: "+3",
    visibility: "68%",
  },
];

const rankingColumns: DataTableColumn<RankingRow>[] = [
  {
    key: "keyword",
    header: "Keyword",
    render: (row) => (
      <span className="font-medium text-text-primary">
        {row.keyword}
      </span>
    ),
  },
  {
    key: "position",
    header: "Position",
    render: (row) => (
      <span className="font-semibold text-text-primary">
        #{row.position}
      </span>
    ),
  },
  {
    key: "change",
    header: "Change",
    render: (row) => (
      <span className="font-semibold text-green">
        ↑ {row.change}
      </span>
    ),
  },
  {
    key: "visibility",
    header: "Visibility",
    render: (row) => row.visibility,
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <main className="page-padding">
        <div className="mx-auto w-full max-w-[1600px]">
          <header className="mb-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-secondary">Overview</p>

                <h1 className="text-page-title text-text-primary">
                  Dashboard
                </h1>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-border bg-white px-4 py-2.5 text-button text-text-primary shadow-card"
                >
                  All Locations
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-border bg-white px-4 py-2.5 text-button text-text-primary shadow-card"
                >
                  Last 30 Days
                </button>
              </div>
            </div>
          </header>

          <section
            aria-label="Dashboard key performance indicators"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {dashboardKpis.map((kpi) => {
              const Icon = kpi.icon;

              return (
                <KPICard
                  key={kpi.label}
                  label={kpi.label}
                  value={kpi.value}
                  supportingText={kpi.supportingText}
                  icon={<Icon size={20} strokeWidth={2} />}
                  trend={
                    <TrendBadge
                      trend={kpi.trend.type}
                      value={kpi.trend.value}
                    />
                  }
                />
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <AreaChart
              title="Performance"
              description="Illustrative average profile health trend across all locations."
              data={performanceData}
              height={280}
              className="xl:col-span-2"
            />

            <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-card-title text-text-primary">
                    Profile Health
                  </h2>

                  <p className="text-secondary mt-1">
                    Average completion and optimization score.
                  </p>
                </div>

                <ProgressRing
                  value={87}
                  size={92}
                  strokeWidth={8}
                  label="Profile health 87 percent"
                />
              </div>

              <div className="mt-6 space-y-5">
                <ProgressBar
                  label="Business information"
                  value={96}
                />

                <ProgressBar
                  label="Categories"
                  value={91}
                />

                <ProgressBar
                  label="Services"
                  value={82}
                />

                <ProgressBar
                  label="Media"
                  value={76}
                />
              </div>
            </section>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card xl:col-span-2">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-card-title text-text-primary">
                    Reviews
                  </h2>

                  <p className="text-secondary mt-1">
                    Illustrative review activity and rating distribution.
                  </p>
                </div>

                <TrendBadge
                  trend="up"
                  value="+12.4%"
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                <AreaChart
                  data={reviewTrendData}
                  height={220}
                />

                <div className="rounded-xl bg-secondary/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <Star size={20} fill="currentColor" />
                    </div>

                    <div>
                      <p className="text-secondary">
                        Average rating
                      </p>

                      <p className="text-kpi text-text-primary">
                        4.7
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <ProgressBar
                      label="5 stars"
                      value={82}
                    />

                    <ProgressBar
                      label="4 stars"
                      value={12}
                    />

                    <ProgressBar
                      label="3 stars"
                      value={4}
                    />

                    <ProgressBar
                      label="1–2 stars"
                      value={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="mb-5">
                <h2 className="text-card-title text-text-primary">
                  Search Visibility
                </h2>

                <p className="text-secondary mt-1">
                  Illustrative local ranking visibility summary.
                </p>
              </div>

              <div className="flex items-center gap-5">
                <ProgressRing
                  value={76}
                  size={100}
                  strokeWidth={9}
                  label="Search visibility 76 percent"
                />

                <div>
                  <p className="text-secondary">
                    Visibility score
                  </p>

                  <p className="text-kpi text-text-primary">
                    76
                  </p>

                  <TrendBadge
                    trend="up"
                    value="+6.8%"
                  />
                </div>
              </div>

              <div className="mt-6">
                <DataTable
                  columns={rankingColumns}
                  data={rankingRows}
                  rowKey={(row) => row.keyword}
                />
              </div>
            </section>
          </section>
        </div>
      </main>
    </AppShell>
  );
}