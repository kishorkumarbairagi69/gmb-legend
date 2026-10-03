import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";

type LocationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { id } = await params;

  const locationName = id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <AppShell>
      <main className="page-padding">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-6">
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-button text-text-primary shadow-card transition-colors hover:bg-secondary"
            >
              <ArrowLeft size={16} strokeWidth={2} />
              Locations
            </Link>
          </div>

          <header className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <Building2 size={23} strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <p className="text-secondary">Location</p>

                  <div className="mt-1 flex flex-wrap items-center gap-2.5">
                    <h1 className="text-page-title text-text-primary">
                      {locationName}
                    </h1>

                    <StatusBadge status="success">
                      Synced
                    </StatusBadge>

                    <StatusBadge status="success">
                      Low Risk
                    </StatusBadge>
                  </div>

                  <p className="text-secondary mt-1">
                    Downtown Group · Google Business Profile
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <SecondaryButton>
                  Edit Profile
                </SecondaryButton>

                <PrimaryButton>
                  <RefreshCw size={16} strokeWidth={2} />
                  Sync
                </PrimaryButton>

                <button
                  type="button"
                  aria-label="More location actions"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-text-secondary shadow-card transition-colors hover:bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <MoreHorizontal size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </header>
        </div>
      </main>
    </AppShell>
  );
}