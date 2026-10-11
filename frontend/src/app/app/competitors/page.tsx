import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="COMPETITOR INTELLIGENCE"
      title="Competitors"
      description="Organize local competitors for future ranking comparisons."
      status="Competitor records and comparison data are not available yet."
      nextSteps={[
        "Define competitor identity and location matching rules.",
        "Store manually supplied or approved-source competitor records.",
        "Compare results only when the underlying metrics are available.",
      ]}
    />
  );
}
