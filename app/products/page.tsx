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
  description?: string;
  image?: string;
  category: string;
  price: string;
  offer?: string;
  locations: number;
  status: "Published" | "Draft";
};

const initialProducts: Product[] = [
  {
  id: "product-001",
  name: "Physics Wallah Vidyapeeth JEE",
  description: "JEE preparation program for students preparing for engineering entrance examinations.",
  category: "IIT JEE",
  price: "₹12,999",
  locations: 177,
  status: "Published",
},
  {
    id: "product-002",
    name: "IIT JEE Complete Batch",
    description: "Complete IIT JEE preparation batch covering the core entrance examination curriculum.",
    category: "IIT JEE",
    price: "₹9,999",
    offer: "Special Offer",
    locations: 142,
    status: "Published",
  },
  {
    id: "product-003",
    name: "NEET Vidyapeeth Batch",
    description: "NEET preparation program for students preparing for medical entrance examinations.",
    category: "NEET",
    price: "₹11,999",
    locations: 164,
    status: "Published",
  },
  {
    id: "product-004",
    name: "NEET Foundation Course",
    description: "Foundation course designed to build core concepts for NEET preparation.",
    category: "NEET",
    price: "₹7,999",
    offer: "Limited Offer",
    locations: 96,
    status: "Draft",
  },
  {
    id: "product-005",
    name: "School Foundation Program",
    description: "Foundation program for students preparing for school-level examinations.",
    category: "School",
    price: "₹6,499",
    locations: 118,
    status: "Published",
  },
  {
    id: "product-006",
    name: "School Learning Program",
    description: "Comprehensive learning program for school students covering various subjects.",
    category: "School",
    price: "₹4,999",
    locations: 84,
    status: "Draft",
  },
  {
    id: "product-007",
    name: "PWNSAT Preparation Program",
    description: "Preparation program for students preparing for the PWNSAT examination.",
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
  const [activeSection, setActiveSection] = useState<
    "products" | "services"
  >("products");

  const [productList, setProductList] =
    useState<Product[]>(initialProducts);

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);

  const [editingProductId, setEditingProductId] =
    useState<string | null>(null);
    const [openProductMenuId, setOpenProductMenuId] =
  useState<string | null>(null);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("IIT JEE");
  const [productPrice, setProductPrice] = useState("");
  const [productOffer, setProductOffer] = useState("");
  const [productLocations, setProductLocations] = useState("0");
  const [productStatus, setProductStatus] =
    useState<Product["status"]>("Draft");

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

  const selectedProducts = productList.filter(
    (product) => product.category === selectedProductCategory,
    
  );

  const resetProductForm = () => {
    setProductName("");
    setProductDescription("");
    setProductImage("");
    setProductCategory(selectedProductCategory);
    setProductPrice("");
    setProductOffer("");
    setProductLocations("0");
    setProductStatus("Draft");
    setEditingProductId(null);
  };

  const handleAddProduct = () => {
  setEditingProductId(null);
  setProductName("");
  setProductDescription("");
  setProductImage("");
  setProductCategory(selectedProductCategory);
  setProductPrice("");
  setProductOffer("");
  setProductLocations("0");
  setProductStatus("Draft");
  setIsProductFormOpen(true);
};

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setProductName(product.name);
    setProductImage(product.image ?? "");
    setProductDescription(product.description ?? "");
    setProductCategory(product.category);
    setProductPrice(product.price.replace("₹", ""));
    setProductOffer(product.offer ?? "");
    setProductLocations(String(product.locations));
    setProductStatus(product.status);
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = () => {
    if (!productName.trim() || !productPrice.trim()) {
      return;
    }

    if (editingProductId) {
      setProductList((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                name: productName.trim(),
                description: productDescription.trim() || undefined,
                    image: productImage || undefined,
                category: productCategory,
                price: `₹${productPrice.replace(/^₹/, "")}`,
                offer: productOffer.trim() || undefined,
                locations: Number(productLocations) || 0,
                status: productStatus,
              }
            : product,
        ),
      );
    } else {
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        name: productName.trim(),
        description: productDescription.trim() || undefined,
        image: productImage || undefined,
        category: productCategory,
        price: `₹${productPrice.replace(/^₹/, "")}`,
        offer: productOffer.trim() || undefined,
        locations: Number(productLocations) || 0,
        status: productStatus,
      };

      setProductList((currentProducts) => [
        ...currentProducts,
        newProduct,
      ]);

      setSelectedProductCategory(productCategory);
    }

    setIsProductFormOpen(false);
    resetProductForm();
  };

  const handleCategorySelect = (category: string) => {
    if (activeSection === "products") {
      setSelectedProductCategory(category);
    } else {
      setSelectedServiceCategory(category);
    }
  };
const handlePublishProduct = (productId: string) => {
  setProductList((currentProducts) =>
    currentProducts.map((product) =>
      product.id === productId
        ? {
            ...product,
            status: "Published",
          }
        : product,
    ),
  );
};

const handleDeleteProduct = (productId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?",
  );

  if (!confirmed) {
    return;
  }

  setProductList((currentProducts) =>
    currentProducts.filter((product) => product.id !== productId),
  );

  setOpenProductMenuId(null);
};

const handleDuplicateProduct = (productId: string) => {
  setProductList((currentProducts) => {
    const sourceProduct = currentProducts.find(
      (product) => product.id === productId,
    );

    if (!sourceProduct) {
      return currentProducts;
    }

    const duplicateProduct: Product = {
      ...sourceProduct,
      id: `product-${Date.now()}`,
      name: `${sourceProduct.name} (Copy)`,
      status: "Draft",
    };

    return [...currentProducts, duplicateProduct];
  });
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
                onClick={handleAddProduct}
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
                {activeSection === "products"
                  ? "products"
                  : "services"}
                .
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
                    }`}
                  >
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
                      </p>
                    </div>

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
            {selectedProducts.length > 0 ? (
              selectedProducts.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex h-40 items-center justify-center overflow-hidden bg-secondary">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
                        <Package className="h-7 w-7" />
                      </div>
                    )}
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

                        {product.description && (
                          <p className="mt-2 line-clamp-2 text-sm leading-5 text-text-secondary">
                            {product.description}
                          </p>
                        )}
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
                        onClick={() => handleEditProduct(product)}
                        className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary transition hover:bg-secondary"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePublishProduct(product.id)}
                        disabled={product.status === "Published"}
                        className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {product.status === "Published"
                          ? "Published"
                          : "Publish"}
                      </button>

                      <div className="relative ml-auto">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenProductMenuId(
                              openProductMenuId === product.id
                                ? null
                                : product.id,
                            )
                          }
                          className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-secondary transition hover:bg-secondary hover:text-text-primary"
                        >
                          More
                        </button>

                        {openProductMenuId === product.id && (
                          <div className="absolute bottom-full right-0 z-20 mb-2 w-44 overflow-hidden rounded-xl border border-border bg-white p-1 shadow-lg">
                            <button
                              type="button"
                              onClick={() => {
                                handleDuplicateProduct(product.id);
                                setOpenProductMenuId(null);
                              }}
                              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-secondary"
                            >
                              Duplicate
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteProduct(product.id)
                              }
                              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-border bg-white px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Package className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-text-primary">
                  No products found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
                  There are no products in this category yet.
                </p>

                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Add Product
                </button>
              </div>
            )}
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

        {isProductFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {editingProductId ? "Edit Product" : "Add Product"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {editingProductId
                      ? "Update the product details."
                      : "Create a new product for your selected category."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsProductFormOpen(false);
                    resetProductForm();
                  }}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <label
                    htmlFor="product-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Product Name
                  </label>

                  <input
                    id="product-name"
                    type="text"
                    value={productName}
                    onChange={(event) =>
                      setProductName(event.target.value)
                    }
                    placeholder="Enter product name"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
<div>
  <label
    htmlFor="product-description"
    className="mb-2 block text-sm font-medium text-slate-700"
  >
    Description
  </label>

  <textarea
    id="product-description"
    value={productDescription}
    onChange={(event) =>
      setProductDescription(event.target.value)
    }
    placeholder="Enter product description"
    rows={4}
    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
  />
</div>
<div>
  <label
    htmlFor="product-image"
    className="mb-2 block text-sm font-medium text-slate-700"
  >
    Product Image
  </label>

  <input
    id="product-image"
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      setProductImage(URL.createObjectURL(file));
    }}
    className="block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-light file:px-3 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/10"
  />

  {productImage && (
    <div className="mt-3 overflow-hidden rounded-xl border border-border bg-secondary">
      <img
        src={productImage}
        alt="Product preview"
        className="h-40 w-full object-cover"
      />
    </div>
  )}
</div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="product-category"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Category
                    </label>

                    <select
                      id="product-category"
                      value={productCategory}
                      onChange={(event) =>
                        setProductCategory(event.target.value)
                      }
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                      {productCategories.map((category) => (
                        <option
                          key={category.name}
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="product-price"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Price
                    </label>

                    <input
                      id="product-price"
                      type="text"
                      value={productPrice}
                      onChange={(event) =>
                        setProductPrice(event.target.value)
                      }
                      placeholder="₹9,999"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="product-offer"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Offer
                    </label>

                    <input
                      id="product-offer"
                      type="text"
                      value={productOffer}
                      onChange={(event) =>
                        setProductOffer(event.target.value)
                      }
                      placeholder="Special Offer"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="product-locations"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Locations
                    </label>

                    <input
                      id="product-locations"
                      type="number"
                      min="0"
                      value={productLocations}
                      onChange={(event) =>
                        setProductLocations(event.target.value)
                      }
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="product-status"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Status
                  </label>

                  <select
                    id="product-status"
                    value={productStatus}
                    onChange={(event) =>
                      setProductStatus(
                        event.target.value as Product["status"],
                      )
                    }
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsProductFormOpen(false);
                    resetProductForm();
                  }}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveProduct}
                  disabled={!productName.trim() || !productPrice.trim()}
                  className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingProductId ? "Save Changes" : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AppShell>
  );
}