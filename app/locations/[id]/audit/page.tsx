import { AppShell } from "@/components/layout/AppShell";

type LocationAuditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LocationAuditPage({
  params,
}: LocationAuditPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="page-padding">
        <p className="text-secondary">Location Audit</p>
        <h1 className="text-page-title text-text-primary">
          Audit for {id}
        </h1>
      </main>
    </AppShell>
  );
}
