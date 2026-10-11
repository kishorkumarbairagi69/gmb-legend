import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="BUSINESS MANAGEMENT"
      title="Business listings"
      description="Organize the business locations in your local SEO workspace."
      status="No business listings have been added."
      nextSteps={[
        "Define the business and location fields required by the approved product scope.",
        "Add persistence and validation before saving real business records.",
        "Connect a provider only after its access, cost, and terms are verified.",
      ]}
    />
  );
}
