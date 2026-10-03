import { AppShell } from "@/components/layout/AppShell";

type BusinessLocationsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BusinessLocationsPage({
  params,
}: BusinessLocationsPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="page-padding">
        <p className="text-secondary">Business Locations</p>
        <h1 className="text-page-title text-text-primary">
          Locations for {id}
        </h1>
      </main>
    </AppShell>
  );
}
