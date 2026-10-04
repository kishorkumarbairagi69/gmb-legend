"use client";

import {
  Check,
  ChevronRight,
  Package,
  Pencil,
  Plus,
  Upload,
  Wrench,
} from "lucide-react";

import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";

type ProductCategory = {
  name: string;
  count: number;
};

const productCategories: ProductCategory[] = [
  {
    name: "IIT JEE",
    count: 24,
  },
  {
    name: "NEET",
    count: 36,
  },
  {
    name: "School",
    count: 18,
  },
  {
    name: "PWNSAT",
    count: 1,
  },
];

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  offer?: string;
  locations: number;
  status: "Published" | "Draft";
};

const products: Product[] = [
  {
    id: "product-001",
    name: "Physics Wallah Vidyapeeth JEE",
    category: "IIT JEE",
    price: "₹12,999",
    locations: 177,
    status: "Published",
  },
  {
    id: "product-002",
    name: "IIT JEE Complete Batch",
    category: "IIT JEE",
    price: "₹9,999",
    offer: "Special Offer",
    locations: 142,
    status: "Published",
  },
  {
    id: "product-003",
    name: "NEET Vidyapeeth Batch",
    category: "NEET",
    price: "₹11,999",
    locations: 164,
    status: "Published",
  },
  {
    id: "product-004",
    name: "NEET Foundation Course",
    category: "NEET",
    price: "₹7,999",
    offer: "Limited Offer",
    locations: 96,
    status: "Draft",
  },
  {
    id: "product-005",
    name: "School Foundation Program",
    category: "School",
    price: "₹6,499",
    locations: 118,
    status: "Published",
  },
  {
    id: "product-006",
    name: "School Learning Program",
    category: "School",
    price: "₹4,999",
    locations: 84,
    status: "Draft",
  },
  {
    id: "product-007",
    name: "PWNSAT Preparation Program",
    category: "PWNSAT",
    price: "₹2,999",
    offer: "Special Offer",
    locations: 64,
    status: "Published",
  },
];
const serviceCategories: ProductCategory[] = [
  {
    name: "All Services",
    count: 12,
  },
  {
    name: "Academic",
    count: 8,
  },
  {
    name: "Admissions",
    count: 6,
  },
  {
    name: "Support",
    count: 4,
  },
];

export default function ProductsPage() {
  const [activeSection, setActiveSection] = useState<"products" | "services">(
    "products",
  );

  const [selectedProductCategory, setSelectedProductCategory] =
    useState("IIT JEE");

  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState("All Services");

  const categories =
    activeSection === "products" ? productCategories : serviceCategories;

  const selectedCategory =
    activeSection === "products"
      ? selectedProductCategory
      : selectedServiceCategory;
      const selectedProducts = products.filter(
  (product) => product.category === selectedProductCategory,
);

  const handleCategorySelect = (category: string) => {
    if (activeSection === "products") {
      setSelectedProductCategory(category);
    } else {
      setSelectedServiceCategory(category);
    }
  };

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
                {activeSection === "products"
                  ? "Add Product"
                  : "Add Service"}
              </button>
            </div>
          </header>

          <section className="surface-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  Catalog
                </p>

                <h2 className="mt-1 text-lg font-semibold text-text-primary">
                  Manage your {activeSection}
                </h2>
              </div>

              <div className="inline-flex w-full rounded-xl bg-secondary p-1 sm:w-fit">
                <button
                  type="button"
                  onClick={() => setActiveSection("products")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition sm:flex-none ${
                    activeSection === "products"
                      ? "bg-white text-primary shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Products
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection("services")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition sm:flex-none ${
                    activeSection === "services"
                      ? "bg-white text-primary shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Wrench className="h-4 w-4" />
                  Services
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-text-primary">
                {activeSection === "products"
                  ? "Product Categories"
                  : "Service Categories"}
              </h2>

              <p className="text-sm text-text-secondary">
                Select a category to view and manage its{" "}
                {activeSection === "products" ? "products" : "services"}.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.name;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handleCategorySelect(category.name)}
className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
  isSelected
    ? "border-primary/30 bg-primary-light/30 shadow-md"
    : "border-border hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
}`}                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-primary-light text-primary"
                        }`}
                      >
                        {activeSection === "products" ? (
                          <Package className="h-5 w-5" />
                        ) : (
                          <Wrench className="h-5 w-5" />
                        )}
                      </div>

                      {isSelected && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <h3 className="font-semibold text-text-primary">
                        {category.name}
                      </h3>

<p className="mt-1 text-sm text-text-secondary">
  {category.count}{" "}
  {activeSection === "products"
    ? category.count === 1
      ? "Product"
      : "Products"
    : category.count === 1
      ? "Service"
      : "Services"}
</p>                    </div>

                    <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary">
                      View{" "}
                      {activeSection === "products"
                        ? "products"
                        : "services"}
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="surface-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Selected Category
                </p>

                <h2 className="mt-1 text-xl font-semibold text-text-primary">
                  {selectedCategory}
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  {activeSection === "products"
                    ? "Products in this category will appear here in F9.3."
                    : "Services in this category will appear here in the services workflow."}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-primary-light px-4 py-2.5 text-sm font-semibold text-primary">
                {activeSection === "products" ? (
                  <Package className="h-4 w-4" />
                ) : (
                  <Wrench className="h-4 w-4" />
                )}

                {activeSection === "products"
                  ? "Products"
                  : "Services"}{" "}
                selected
              </div>
            </div>
          </section>
<section>
  <div className="mb-4 flex items-end justify-between gap-4">
    <div>
      <h2 className="text-lg font-semibold text-text-primary">
        {selectedProductCategory} Products
      </h2>

      <p className="mt-1 text-sm text-text-secondary">
        Products assigned to the selected category.
      </p>
    </div>

    <span className="rounded-full bg-primary-light px-3 py-1.5 text-sm font-semibold text-primary">
  {selectedProducts.length}{" "}
  {selectedProducts.length === 1 ? "product" : "products"}
</span>
  </div>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
    {selectedProducts.map((product) => (
      <article
        key={product.id}
        className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
      >
        <div className="flex h-40 items-center justify-center bg-secondary">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Package className="h-7 w-7" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-text-secondary">
                {product.category}
              </p>

              <h3 className="mt-1 text-base font-semibold text-text-primary">
                {product.name}
              </h3>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                product.status === "Published"
                  ? "bg-green-50 text-green-600"
                  : "bg-secondary text-text-secondary"
              }`}
            >
              {product.status}
            </span>
          </div>

          <div className="mt-5">
            <p className="text-lg font-bold text-text-primary">
              {product.price}
            </p>

            {product.offer && (
              <p className="mt-1 text-xs font-semibold text-orange-500">
                {product.offer}
              </p>
            )}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary">
            <span
              className={`h-2 w-2 rounded-full ${
                product.status === "Published"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />

            {product.status === "Published"
              ? `Published to ${product.locations} locations`
              : `Available to ${product.locations} locations`}
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
            <button
              type="button"
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary transition hover:bg-secondary"
            >
              Edit
            </button>

            <button
              type="button"
              className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Publish
            </button>

            <button
              type="button"
              className="ml-auto rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-secondary transition hover:bg-secondary hover:text-text-primary"
            >
              More
            </button>
          </div>
        </div>
      </article>
    ))}
  </div>
</section>
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="surface-card">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-light p-3 text-primary">
                  <Package className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-text-primary">
                    {activeSection === "products"
                      ? "Product Management"
                      : "Service Management"}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-text-secondary">
                    Organize your{" "}
                    {activeSection === "products"
                      ? "products"
                      : "services"}{" "}
                    by category and prepare them for multi-location
                    management.
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
                    Manage selected locations and prepare bulk publishing
                    workflows.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}