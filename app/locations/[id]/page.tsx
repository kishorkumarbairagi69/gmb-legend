import {
  Building2,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { KPICard } from "@/components/ui/KPICard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";

type LocationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const locationData = {
  name: "Downtown Central",
  business: "Downtown Group",
  address: "120 Market Street, Downtown",
  phone: "+1 (555) 014-2848",
  email: "downtown@example.com",
  website: "https://downtowngroup.example.com",
  category: "Business Services",
  profileHealth: 96,
  reviews: 428,
  rating: "4.8",
  visibility: 84,
  syncStatus: "Synced",
  riskStatus: "Low Risk",
  googleAccount: "downtown@example.com",
  lastSynced: "Today at 10:42 AM",
};

const healthMetrics = [
  {
    label: "Business information",
    value: 98,
  },
  {
    label: "Categories",
    value: 96,
  },
  {
    label: "Services",
    value: 94,
  },
  {
    label: "Media",
    value: 91,
  },
];

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="page-padding">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-6">
            <SecondaryButton>
              ← Locations
            </SecondaryButton>
          </div>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <Building2 size={23} strokeWidth={2} />
                </div>

                <div>
                  <p className="text-secondary">Location</p>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <h1 className="text-page-title text-text-primary">
                      {locationData.name}
                    </h1>

                    <StatusBadge status="success">
                      {locationData.syncStatus}
                    </StatusBadge>

                    <StatusBadge status="success">
                      {locationData.riskStatus}
                    </StatusBadge>
                  </div>

                  <p className="text-secondary mt-1">
                    {locationData.business} · Google Business Profile
                  </p>

                  <p className="text-secondary mt-1">
                    ID: {id}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <SecondaryButton>
                  Edit Profile
                </SecondaryButton>

                <PrimaryButton>
                  <RefreshCw size={16} strokeWidth={2} />
                  Sync
                </PrimaryButton>
              </div>
            </div>
          </section>

          <section
            aria-label="Location key performance indicators"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <KPICard
              label="Profile Health"
              value={`${locationData.profileHealth}%`}
              supportingText="Profile completion score"
              icon={<ShieldCheck size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Reviews"
              value={locationData.reviews.toLocaleString()}
              supportingText="Reviews for this location"
              icon={<MessageSquare size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Average Rating"
              value={locationData.rating}
              supportingText="Google review rating"
              icon={<Star size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Search Visibility"
              value={`${locationData.visibility}%`}
              supportingText="Local search visibility"
              icon={<Search size={20} strokeWidth={2} />}
            />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card xl:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-section-title text-text-primary">
                    Business Information
                  </h2>

                  <p className="text-secondary mt-1">
                    Core information connected to this location.
                  </p>
                </div>

                <StatusBadge status="success">
                  Complete
                </StatusBadge>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary p-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin size={16} />
                    <span className="text-table font-medium">
                      Address
                    </span>
                  </div>

                  <p className="text-table mt-2 text-text-primary">
                    {locationData.address}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary p-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Phone size={16} />
                    <span className="text-table font-medium">
                      Phone
                    </span>
                  </div>

                  <p className="text-table mt-2 text-text-primary">
                    {locationData.phone}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary p-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Mail size={16} />
                    <span className="text-table font-medium">
                      Email
                    </span>
                  </div>

                  <p className="text-table mt-2 text-text-primary">
                    {locationData.email}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary p-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Globe size={16} />
                    <span className="text-table font-medium">
                      Website
                    </span>
                  </div>

                  <p className="text-table mt-2 break-all text-text-primary">
                    {locationData.website}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Building2 size={16} />
                    <span className="text-table font-medium">
                      Primary Category
                    </span>
                  </div>

                  <p className="text-table mt-2 text-text-primary">
                    {locationData.category}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-card-title text-text-primary">
                    Profile Health
                  </h2>

                  <p className="text-secondary mt-1">
                    Profile completion and optimization score.
                  </p>
                </div>

                <ProgressRing
                  value={locationData.profileHealth}
                  size={76}
                  strokeWidth={7}
                  label={`Profile health ${locationData.profileHealth} percent`}
                />
              </div>

              <div className="mt-6 space-y-5">
                {healthMetrics.map((metric) => (
                  <ProgressBar
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                  />
                ))}
              </div>
            </section>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-card-title text-text-primary">
                    Google Connection
                  </h2>

                  <p className="text-secondary mt-1">
                    Google Business Profile connection status.
                  </p>
                </div>

                <StatusBadge status="success">
                  {locationData.syncStatus}
                </StatusBadge>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-table text-text-secondary">
                    Google account
                  </span>

                  <span className="text-table font-medium text-text-primary">
                    {locationData.googleAccount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-table text-text-secondary">
                    Last synced
                  </span>

                  <span className="text-table font-medium text-text-primary">
                    {locationData.lastSynced}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-table text-text-secondary">
                    Sync status
                  </span>

                  <StatusBadge status="success">
                    Healthy
                  </StatusBadge>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div>
                <h2 className="text-card-title text-text-primary">
                  Quick Actions
                </h2>

                <p className="text-secondary mt-1">
                  Common actions for this location.
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <SecondaryButton className="justify-start">
                  Edit Profile
                </SecondaryButton>

                <SecondaryButton className="justify-start">
                  View Reviews
                </SecondaryButton>

                <SecondaryButton className="justify-start">
                  Manage Posts
                </SecondaryButton>

                <SecondaryButton className="justify-start">
                  Run Audit
                </SecondaryButton>
              </div>
            </section>
          </section>
        </div>
      </main>
    </AppShell>
  );
}