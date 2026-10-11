import Link from "next/link";
import { AppShell } from "@/components/dashboard/app-shell";

type ModulePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  nextSteps: string[];
};

export function ModulePage({
  eyebrow,
  title,
  description,
  status,
  nextSteps,
}: ModulePageProps) {
  return (
    <AppShell>
      <div className="app-page-heading">
        <div>
          <p className="app-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="app-page-description">{description}</p>
        </div>
        <span className="app-status-badge">
          <span />
          UI scaffold
        </span>
      </div>

      <div className="app-notice" role="status">
        <span className="app-notice-icon" aria-hidden="true">i</span>
        <div>
          <strong>{status}</strong>
          <p>
            This screen is a user-interface scaffold. Data persistence,
            provider connections, and background jobs are not implemented
            in this phase.
          </p>
        </div>
      </div>

      <section className="app-panel app-module-panel">
        <div className="app-panel-heading">
          <div>
            <h2>Getting started</h2>
            <p>Planned setup for this workflow</p>
          </div>
          <span className="app-muted-label">Not connected</span>
        </div>

        <ol className="app-steps">
          {nextSteps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>

        <div className="app-empty-panel app-module-empty">
          <span className="app-empty-icon" aria-hidden="true">◌</span>
          <h3>No data to display yet</h3>
          <p>
            When the required backend and approved data source are available,
            this area will display verified results.
          </p>
        </div>

        <div className="app-module-footer">
          <Link href="/app" className="app-secondary-button">Back to overview</Link>
          <span>Live actions are not available in this phase.</span>
        </div>
      </section>
    </AppShell>
  );
}
