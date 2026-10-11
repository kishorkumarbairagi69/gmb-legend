import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="LOCAL SEO ANALYTICS"
      title="Local rankings"
      description="Prepare location-aware ranking tracking and result review."
      status="No ranking provider or tracking jobs are configured."
      nextSteps={[
        "Select an approved ranking source with verified cost and terms.",
        "Define rank, location, device, and observation-time semantics.",
        "Add scheduled scans and history after backend jobs are implemented.",
      ]}
    />
  );
}
