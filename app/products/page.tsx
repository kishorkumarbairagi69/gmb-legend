"use client";

import { Package, Pencil, Plus, Upload } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";

export default function ProductsPage() {
  return (
    <AppShell>
      <main className="page-padding">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">
                Management
              </p>

              <h1 className="mt-1 text-page-title text-text-primary">
                Products & Services
              </h1>

              <p className="mt-2 text-sm text-text-secondary">
                Manage products and services across your selected locations.
              </p>

              <div className="mt-3 inline-flex items-center rounded-full bg-primary-light px-3 py-1.5 text-sm font-semibold text-primary">
                745 locations selected
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-sm font-semibold text-text-primary shadow-sm transition hover:bg-secondary"
              >
                <Pencil className="h-4 w-4" />
                Bulk Edit
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="surface-card">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-light p-3 text-primary">
                  <Package className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-text-primary">
                    Products
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-text-secondary">
                    Organize products by category and manage their publishing
                    across multiple locations.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-light p-3 text-primary">
                  <Upload className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-text-primary">
                    Bulk Management
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-text-secondary">
                    Select locations and prepare bulk product updates and
                    publishing workflows.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="surface-card">
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                <Package className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-text-primary">
                Products & Services workspace
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-text-secondary">
                Product categories, product cards, services, location
                assignment, and bulk actions will be added in the next F9
                steps.
              </p>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}