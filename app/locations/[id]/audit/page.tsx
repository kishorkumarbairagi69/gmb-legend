import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  FileCheck2,
  Lightbulb,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StatusBadge } from "@/components/ui/StatusBadge";

type LocationAuditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const auditCategories = [
  {
    name: "Business Information",
    score: 98,
    checks: 8,
    passed: 8,
  },
  {
    name: "Categories",
    score: 96,
    checks: 6,
    passed: 5,
  },
  {
    name: "Services",
    score: 94,
    checks: 7,
    passed: 6,
  },
  {
    name: "Media",
    score: 91,
    checks: 6,
    passed: 5,
  },
  {
    name: "Google Connection",
    score: 100,
    checks: 4,
    passed: 4,
  },
];

const auditChecks = [
  {
    title: "Business name is complete",
    category: "Business Information",
    description: "The business name is present and synchronized.",
    status: "Passed" as const,
  },
  {
    title: "Primary category is configured",
    category: "Categories",
    description: "A primary Google Business Profile category is assigned.",
    status: "Passed" as const,
  },
  {
    title: "Business hours are complete",
    category: "Business Information",
    description: "Regular operating hours are configured for the location.",
    status: "Passed" as const,
  },
  {
    title: "Service coverage needs review",
    category: "Services",
    description:
      "One recommended service is missing from the current profile.",
    status: "Warning" as const,
  },
  {
    title: "Recent media coverage needs attention",
    category: "Media",
    description:
      "The profile could benefit from additional recent photos.",
    status: "Warning" as const,
  },
  {
    title: "Google Business Profile connection is healthy",
    category: "Google Connection",
    description: "The location is synchronized with the connected account.",
    status: "Passed" as const,
  },
];

const statusConfig = {
  Passed: {
    badge: "success" as const,
    icon: CheckCircle2,
    iconClass: "text-green",
  },
  Warning: {
    badge: "warning" as const,
    icon: AlertTriangle,
    iconClass: "text-orange",
  },
};

export default async function LocationAuditPage({
  params,
}: LocationAuditPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="page-padding">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-5">
            <a
              href={`/locations/${id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-button text-text-primary shadow-card transition-colors hover:bg-secondary"
            >
              <ArrowLeft size={16} strokeWidth={2} />
              Location Overview
            </a>
          </div>

          <header className="mb-6">
            <p className="text-secondary">Location Audit</p>

            <div className="mt-1 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-page-title text-text-primary">
                  Profile Audit
                </h1>

                <p className="text-secondary mt-2">
                  Review profile completeness, optimization checks, and
                  recommendations for this location.
                </p>
              </div>

              <StatusBadge status="success">
                Audit completed
              </StatusBadge>
            </div>
          </header>

          <section className="grid gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-border bg-white p-6 shadow-card xl:col-span-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-secondary">Overall profile health</p>

                  <h2 className="text-section-title mt-1 text-text-primary">
                    96%
                  </h2>
                </div>

                <ProgressRing
                  value={96}
                  size={104}
                  strokeWidth={9}
                  label="Overall profile health 96 percent"
                />
              </div>

              <div className="mt-6">
                <ProgressBar
                  label="Audit completion"
                  value={96}
                />
              </div>

              <div className="mt-5 rounded-xl bg-primary-light p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-table font-semibold text-text-primary">
                      Strong profile health
                    </p>

                    <p className="text-secondary mt-1">
                      Most profile checks are complete. A few optimization
                      opportunities remain.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-6 shadow-card xl:col-span-2">
              <div className="mb-5">
                <h2 className="text-section-title text-text-primary">
                  Audit Categories
                </h2>

                <p className="text-secondary mt-1">
                  Completion across the main profile optimization areas.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {auditCategories.map((category) => (
                  <div
                    key={category.name}
                    className="rounded-xl bg-secondary/60 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-table font-semibold text-text-primary">
                        {category.name}
                      </p>

                      <span className="text-table font-semibold text-text-secondary">
                        {category.score}%
                      </span>
                    </div>

                    <ProgressBar
                      value={category.score}
                      showValue={false}
                    />

                    <p className="text-secondary mt-2">
                      {category.passed} of {category.checks} checks passed
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-border bg-white shadow-card xl:col-span-2">
              <div className="border-b border-border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-section-title text-text-primary">
                      Audit Checks
                    </h2>

                    <p className="text-secondary mt-1">
                      Individual checks contributing to the profile score.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-green/10 px-2.5 py-1 text-table font-semibold text-green">
                    <CheckCircle2 size={14} />
                    4 passed
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {auditChecks.map((check) => {
                  const config = statusConfig[check.status];
                  const Icon = config.icon;

                  return (
                    <div
                      key={check.title}
                      className="flex items-start gap-4 p-5"
                    >
                      <div className="mt-0.5 shrink-0">
                        <Icon size={20} className={config.iconClass} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="text-table font-semibold text-text-primary">
                            {check.title}
                          </h3>

                          <StatusBadge status={config.badge}>
                            {check.status}
                          </StatusBadge>
                        </div>

                        <p className="text-secondary mt-1">
                          {check.description}
                        </p>

                        <p className="text-secondary mt-2">
                          {check.category}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <div className="mb-5">
                <h2 className="text-section-title text-text-primary">
                  Recommendations
                </h2>

                <p className="text-secondary mt-1">
                  Suggested actions based on the audit.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                      <Lightbulb size={18} />
                    </div>

                    <div>
                      <p className="text-table font-semibold text-text-primary">
                        Add the missing service
                      </p>

                      <p className="text-secondary mt-1">
                        Review the service list and add the recommended missing
                        service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                      <FileCheck2 size={18} />
                    </div>

                    <div>
                      <p className="text-table font-semibold text-text-primary">
                        Improve recent media coverage
                      </p>

                      <p className="text-secondary mt-1">
                        Add recent location photos to strengthen profile media
                        coverage.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-table font-semibold text-text-primary">
                        Location ID
                      </p>

                      <p className="text-secondary mt-1 break-all">
                        {id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section className="mt-6 rounded-2xl border border-orange/20 bg-orange/5 p-5">
            <div className="flex items-start gap-3">
              <CircleAlert
                size={19}
                className="mt-0.5 shrink-0 text-orange"
              />

              <div>
                <p className="text-table font-semibold text-text-primary">
                  Audit data is currently illustrative
                </p>

                <p className="text-secondary mt-1">
                  The frontend is displaying the audit structure only. Real
                  audit calculations and Google Business Profile data will be
                  connected during the backend phases.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}