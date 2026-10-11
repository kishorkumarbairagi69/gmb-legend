import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <ModulePage
      eyebrow="KEYWORD INTELLIGENCE"
      title="Keyword research"
      description="Prepare keyword lists and local search research workflows."
      status="Keyword research is not connected to a data source."
      nextSteps={[
        "Define keyword, location, and search-intent fields.",
        "Confirm an approved data source and the provenance of volume or trend metrics.",
        "Implement keyword storage and search after the backend foundation is ready.",
      ]}
    />
  );
}
