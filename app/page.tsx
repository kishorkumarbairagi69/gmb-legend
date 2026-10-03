import { Sparkline } from "@/components/charts/Sparkline";
import { AppShell } from "@/components/layout/AppShell";

const profileHealth = [
  { value: 62 },
  { value: 66 },
  { value: 64 },
  { value: 71 },
  { value: 76 },
  { value: 82 },
  { value: 87 },
];

const visibility = [
  { value: 48 },
  { value: 51 },
  { value: 54 },
  { value: 57 },
  { value: 61 },
  { value: 69 },
  { value: 76 },
];

export default function Home() {
  return (
    <AppShell>
      <div className="page-padding">
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <p className="text-secondary">Profile Health</p>

            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <div className="text-kpi text-text-primary">87</div>
                <div className="text-secondary mt-1">Current score</div>
              </div>

              <Sparkline data={profileHealth} />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <p className="text-secondary">Search Visibility</p>

            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <div className="text-kpi text-text-primary">76</div>
                <div className="text-secondary mt-1">Current score</div>
              </div>

              <Sparkline
                data={visibility}
                width={140}
                height={48}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <p className="text-secondary">Review Trend</p>

            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <div className="text-kpi text-text-primary">+24%</div>
                <div className="text-secondary mt-1">Last 30 days</div>
              </div>

              <Sparkline
                data={[
                  { value: 24 },
                  { value: 28 },
                  { value: 26 },
                  { value: 34 },
                  { value: 39 },
                  { value: 43 },
                  { value: 48 },
                ]}
              />
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}