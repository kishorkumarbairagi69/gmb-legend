import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="WORKSPACE MANAGEMENT"
      title="Workspace settings"
      description="Review the planned configuration areas for your workspace."
      status="Account security and workspace persistence are not configured."
      nextSteps={[
        "Define workspace profile and brand settings.",
        "Implement authentication and server-enforced authorization in their planned phases.",
        "Add connection settings only for verified and supported providers.",
      ]}
    />
  );
}
