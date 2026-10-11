import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="GEOGRAPHIC VISIBILITY"
      title="Geo-grid ranker"
      description="Prepare geographic scan settings and result visualization."
      status="Geo-grid scans are unavailable until a compliant ranking source is configured."
      nextSteps={[
        "Define the business coordinates, grid size, and scan keywords.",
        "Run scans through a validated backend job rather than the browser.",
        "Show a heatmap only when verified multi-point results exist.",
      ]}
    />
  );
}
