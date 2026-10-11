import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="MARKET INTELLIGENCE"
      title="Market research"
      description="Prepare local market comparisons and research workflows."
      status="No market research data source is connected."
      nextSteps={[
        "Define the market, city, and comparison scope.",
        "Confirm the provenance and permitted use of each research data source.",
        "Build comparisons and exports from verified records.",
      ]}
    />
  );
}
