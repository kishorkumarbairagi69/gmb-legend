import Link from "next/link";
import { AppShell } from "@/components/dashboard/app-shell";

const quickActions = [
  {
    title: "Organize business listings",
    description: "Prepare the locations you want to manage.",
    href: "/app/listings",
    icon: "◎",
  },
  {
    title: "Research keywords",
    description: "Build a list of local search terms.",
    href: "/app/keywords",
    icon: "⌕",
  },
  {
    title: "Explore local rankings",
    description: "Configure a future ranking workflow.",
    href: "/app/rankings",
    icon: "↗",
  },
];

function EmptyPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="app-empty-panel">
      <span className="app-empty-icon" aria-hidden="true">◌</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="app-page-heading">
        <div>
          <p className="app-eyebrow">WORKSPACE OVERVIEW</p>
          <h1>Good work starts with a clear picture.</h1>
          <p className="app-page-description">
            Set up your local SEO workspace and prepare your first workflows.
          </p>
        </div>
        <span className="app-date-chip">Preview environment</span>
      </div>

      <div className="app-notice" role="status">
        <span className="app-notice-icon" aria-hidden="true">i</span>
        <div>
          <strong>Your workspace is not connected to live data yet.</strong>
          <p>
            Metrics and reports will appear when their data sources and
            backend workflows are implemented. No SEO results are being
            simulated here.
          </p>
        </div>
      </div>

      <section className="app-section" aria-labelledby="setup-title">
        <div className="app-section-heading">
          <div>
            <h2 id="setup-title">Get your workspace ready</h2>
            <p>Start with the foundations for your local SEO workflows.</p>
          </div>
          <span className="app-section-meta">3 starting points</span>
        </div>

        <div className="app-quick-grid">
          {quickActions.map((action, index) => (
            <Link className="app-quick-card" href={action.href} key={action.href}>
              <span className="app-quick-number">
                0{index + 1}
              </span>
              <span className="app-quick-icon" aria-hidden="true">
                {action.icon}
              </span>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
              <span className="app-card-link">Open workspace <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <div className="app-dashboard-grid">
        <section className="app-panel" aria-labelledby="visibility-title">
          <div className="app-panel-heading">
            <div>
              <h2 id="visibility-title">Local visibility</h2>
              <p>Ranking and performance trends</p>
            </div>
            <Link href="/app/rankings" className="app-subtle-link">View rankings →</Link>
          </div>
          <EmptyPanel
            title="No ranking data available"
            description="Configure an approved ranking data source before viewing performance trends."
          />
        </section>

        <section className="app-panel" aria-labelledby="activity-title">
          <div className="app-panel-heading">
            <div>
              <h2 id="activity-title">Recent activity</h2>
              <p>Workspace jobs and updates</p>
            </div>
            <span className="app-muted-label">No activity yet</span>
          </div>
          <EmptyPanel
            title="Your activity will appear here"
            description="Completed scans, listing changes, and report delivery history will be shown when those workflows are available."
          />
        </section>
      </div>

      <section className="app-section app-next-section" aria-labelledby="modules-title">
        <div className="app-section-heading">
          <div>
            <h2 id="modules-title">Explore your workspace</h2>
            <p>Module screens are being prepared; live integrations are not connected.</p>
          </div>
        </div>

        <div className="app-module-list">
          <Link href="/app/geo-grid"><span>▦</span><span><strong>Geo-grid ranker</strong><small>Geographic ranking workflow</small></span><span>→</span></Link>
          <Link href="/app/competitors"><span>◫</span><span><strong>Competitor research</strong><small>Organize local market comparisons</small></span><span>→</span></Link>
          <Link href="/app/reports"><span>▤</span><span><strong>Reports & alerts</strong><small>Prepare reporting preferences</small></span><span>→</span></Link>
        </div>
      </section>
    </AppShell>
  );
}
