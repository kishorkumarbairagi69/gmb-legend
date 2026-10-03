import {
  ArrowLeft,
  Building2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { KPICard } from "@/components/ui/KPICard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";

const business = {
  name: "Downtown Group",
  slug: "downtown-group",
  status: "Connected" as const,
  googleAccount: "downtown@example.com",
  locations: 48,
  health: 92,
  website: "https://downtowngroup.example.com",
  phone: "+1 (555) 014-2848",
  email: "downtown@example.com",
  address: "120 Market Street, Downtown",
};

const locationSummary = [
  {
    name: "Downtown Central",
    city: "Downtown",
    health: 96,
    status: "Healthy",
  },
  {
    name: "Downtown North",
    city: "North District",
    health: 91,
    status: "Healthy",
  },
  {
    name: "Downtown South",
    city: "South District",
    health: 87,
    status: "Needs Review",
  },
  {
    name: "Downtown East",
    city: "East District",
    health: 82,
    status: "Needs Review",
  },
];

const healthBreakdown = [
  { label: "Business information", value: 96 },
  { label: "Categories", value: 93 },
  { label: "Services", value: 89 },
  { label: "Media", value: 86 },
];

export default function BusinessDetailPage() {
  return (
    <AppShell>
      <main className="page-padding">
        <div className="mx-auto w-full max-w-[1600px]">
          <header className="mb-6">
            <div className="mb-4">
              <SecondaryButton>
                <ArrowLeft size={16} strokeWidth={2} />
                Back to Businesses
              </SecondaryButton>
            </div>

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <Building2 size={26} strokeWidth={2} />
                </div>

                <div>
                  <p className="text-secondary">Business Management</p>

                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <h1 className="text-page-title text-text-primary">
                      {business.name}
                    </h1>

                    <StatusBadge status="success">
                      {business.status}
                    </StatusBadge>
                  </div>

                  <p className="mt-1 text-secondary">
                    {business.slug} · {business.googleAccount}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <SecondaryButton>
                  <ExternalLink size={16} strokeWidth={2} />
                  Open Website
                </SecondaryButton>

                <PrimaryButton>
                  <MapPin size={16} strokeWidth={2} />
                  View Locations
                </PrimaryButton>
              </div>
            </div>
          </header>

          <section
            aria-label="Business key performance indicators"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <KPICard
              label="Locations"
              value={String(business.locations)}
              supportingText="Connected locations"
              icon={<MapPin size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Profile Health"
              value={`${business.health}%`}
              supportingText="Average health score"
              icon={<ShieldCheck size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Google Account"
              value="Connected"
              supportingText={business.googleAccount}
              icon={<Users size={20} strokeWidth={2} />}
            />

            <KPICard
              label="Business Status"
              value="Active"
              supportingText="Google Business Profile access"
              icon={<Building2 size={20} strokeWidth={2} />}
            />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-card xl:col-span-2">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-section-title text-text-primary">
                    Business Information
                  </h2>

                  <p className="text-secondary mt-1">
                    Core business information and connected account details.
                  </p>
                </div>

                <StatusBadge status="success">Connected</StatusBadge>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-text-secondary">
                    <MapPin size={16} strokeWidth={2} />
                    <span className="text-table font-medium">Address</span>
                  </div>

                  <p className="text-body text-text-primary">
                    {business.address}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-text-secondary">
                    <Phone size={16} strokeWidth={2} />
                    <span className="text-table font-medium">Phone</span>
                  </div>

                  <p className="text-body text-text-primary">
                    {business.phone}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-text-secondary">
                    <Mail size={16} strokeWidth={2} />
                    <span className="text-table font-medium">Email</span>
                  </div>

                  <p className="text-body text-text-primary">
                    {business.email}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-text-secondary">
                    <Globe size={16} strokeWidth={2} />
                    <span className="text-table font-medium">Website</span>
                  </div>

                  <p className="truncate text-body text-text-primary">
                    {business.website}
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
                    Average optimization score.
                  </p>
                </div>

                <ProgressRing
                  value={business.health}
                  size={88}
                  strokeWidth={8}
                  label={`Business profile health ${business.health} percent`}
                />
              </div>

              <div className="mt-6 space-y-5">
                {healthBreakdown.map((item) => (
                  <ProgressBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </section>
          </section>

          <section className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-section-title text-text-primary">
                  Connected Locations
                </h2>

                <p className="text-secondary mt-1">
                  Recent locations connected to this business.
                </p>
              </div>

              <SecondaryButton>
                View All {business.locations} Locations
              </SecondaryButton>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {locationSummary.map((location) => (
                <div
                  key={location.name}
                  className="rounded-xl border border-border bg-white p-4 transition-shadow duration-200 hover:shadow-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <MapPin size={18} strokeWidth={2} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-table font-semibold text-text-primary">
                            {location.name}
                          </h3>

                          <p className="text-secondary">{location.city}</p>
                        </div>

                        <StatusBadge
                          status={
                            location.status === "Healthy"
                              ? "success"
                              : "warning"
                          }
                        >
                          {location.status}
                        </StatusBadge>
                      </div>

                      <div className="mt-3">
                        <ProgressBar
                          label="Profile health"
                          value={location.health}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
