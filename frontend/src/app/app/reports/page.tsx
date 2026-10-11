import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="REPORTING"
      title="Reports & alerts"
      description="Prepare reporting preferences, alert rules, and delivery history."
      status="Report generation and alert delivery are not configured."
      nextSteps={[
        "Define report scope, frequency, and supported output formats.",
        "Choose delivery methods that can be operated within the approved cost policy.",
        "Record delivery outcomes and errors after jobs and persistence exist.",
      ]}
    />
  );
}
