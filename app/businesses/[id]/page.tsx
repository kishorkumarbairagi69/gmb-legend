import { AppShell } from "@/components/layout/AppShell";

type BusinessPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BusinessPage({
  params,
}: BusinessPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="page-padding">
        <p className="text-secondary">Business</p>
        <h1 className="text-page-title text-text-primary">
          Business {id}
        </h1>
      </main>
    </AppShell>
  );
}
