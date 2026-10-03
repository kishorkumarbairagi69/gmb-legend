import { AppShell } from "@/components/layout/AppShell";

type LocationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="page-padding">
        <p className="text-secondary">Location</p>
        <h1 className="text-page-title text-text-primary">
          Location {id}
        </h1>
      </main>
    </AppShell>
  );
}
