"use client";

import {
  CalendarDays,
  FileText,
  ImagePlus,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Clock3,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { KPICard } from "@/components/ui/KPICard";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Post = {
  id: string;
  title: string;
  content: string;
  location: string;
  type: "Update" | "Offer" | "Event";
  date: string;
  status: "Published" | "Scheduled" | "Draft";
};

const initialPosts: Post[] = [
  {
    id: "post-001",
    title: "Summer Service Update",
    content:
      "Discover our latest services and see what's new at Downtown Central.",
    location: "Downtown Central",
    type: "Update",
    date: "Jun 18, 2026",
    status: "Published",
  },
  {
    id: "post-002",
    title: "Weekend Special Offer",
    content:
      "Enjoy our limited weekend offer. Contact our team to learn more.",
    location: "Downtown North",
    type: "Offer",
    date: "Jun 20, 2026",
    status: "Scheduled",
  },
  {
    id: "post-003",
    title: "Customer Appreciation Event",
    content:
      "Join us for a customer appreciation event at our Market Square location.",
    location: "Market Square",
    type: "Event",
    date: "Jun 22, 2026",
    status: "Scheduled",
  },
  {
    id: "post-004",
    title: "New Service Announcement",
    content:
      "We are excited to announce a new service now available at our locations.",
    location: "Downtown South",
    type: "Update",
    date: "Jun 17, 2026",
    status: "Draft",
  },
  {
    id: "post-005",
    title: "Local Business Spotlight",
    content:
      "Learn more about the people and services that make our local community special.",
    location: "Downtown Central",
    type: "Update",
    date: "Jun 15, 2026",
    status: "Published",
  },
  {
    id: "post-006",
    title: "Midweek Promotion",
    content:
      "Take advantage of this week's promotion while the offer is available.",
    location: "Market Square",
    type: "Offer",
    date: "Jun 12, 2026",
    status: "Published",
  },
];

const statusOptions = ["All", "Published", "Scheduled", "Draft"];

export default function PostsPage() {
const [posts] = useState(initialPosts);
const [statusFilter, setStatusFilter] = useState("All");
const [locationFilter, setLocationFilter] = useState("All Locations");
const [search, setSearch] = useState("");
const [isCreateOpen, setIsCreateOpen] = useState(false);
const [postType, setPostType] = useState<"Update" | "Offer" | "Event">(
  "Update",
);
const [postLocation, setPostLocation] = useState("Downtown Central");
const [postContent, setPostContent] = useState("");
const [callToAction, setCallToAction] = useState("Learn more");
  const locations = useMemo(
    () => [
      "All Locations",
      ...Array.from(new Set(posts.map((post) => post.location))),
    ],
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesStatus =
        statusFilter === "All" || post.status === statusFilter;

      const matchesLocation =
        locationFilter === "All Locations" ||
        post.location === locationFilter;

      const matchesSearch =
        !normalizedSearch ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.content.toLowerCase().includes(normalizedSearch) ||
        post.location.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesLocation && matchesSearch;
    });
  }, [locationFilter, posts, search, statusFilter]);

  const publishedCount = posts.filter(
    (post) => post.status === "Published",
  ).length;

  const scheduledCount = posts.filter(
    (post) => post.status === "Scheduled",
  ).length;

  const draftCount = posts.filter((post) => post.status === "Draft").length;

  const columns = [
    {
      key: "post",
      header: "Post",
      render: (post: Post) => (
        <div className="min-w-[280px]">
          <p className="font-semibold text-text-primary">{post.title}</p>
          <p className="mt-1 max-w-[420px] truncate text-xs text-text-secondary">
            {post.content}
          </p>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (post: Post) => (
        <span className="whitespace-nowrap text-text-secondary">
          {post.location}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (post: Post) => (
        <span className="text-text-secondary">{post.type}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (post: Post) => (
        <span className="whitespace-nowrap text-text-secondary">
          {post.date}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (post: Post) => (
        <StatusBadge
          status={
            post.status === "Published"
              ? "success"
              : post.status === "Scheduled"
                ? "info"
                : "neutral"
          }
        >
          {post.status}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "Action",
      className: "w-[80px]",
      render: () => (
        <button
          type="button"
          aria-label="Post actions"
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-secondary hover:text-text-primary"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      ),
    },
  ];

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
                Posts
              </h1>

              <p className="mt-2 text-sm text-text-secondary">
                Create, schedule, publish, and manage posts across your
                locations.
              </p>
            </div>

           <button
  type="button"
  onClick={() => setIsCreateOpen(true)}
  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
>
              <Plus className="h-4 w-4" />
              Create Post
            </button>
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KPICard
              label="Total Posts"
              value={String(posts.length)}
              supportingText="Across all locations"
              icon={<FileText className="h-5 w-5" />}
            />

            <KPICard
              label="Published"
              value={String(publishedCount)}
              supportingText="Currently published"
              icon={<Send className="h-5 w-5" />}
            />

            <KPICard
              label="Scheduled"
              value={String(scheduledCount)}
              supportingText="Queued for publishing"
              icon={<Clock3 className="h-5 w-5" />}
            />

            <KPICard
              label="Drafts"
              value={String(draftCount)}
              supportingText="Awaiting completion"
              icon={<FileText className="h-5 w-5" />}
            />
          </section>

          <section className="surface-card">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  All Posts
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Review publishing activity and manage content across your
                  locations.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex h-10 min-w-[240px] items-center gap-2 rounded-full border border-border bg-white px-4 shadow-sm">
                  <Search className="h-4 w-4 text-text-secondary" />
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search posts"
                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
                  />
                </div>

                <select
                  value={locationFilter}
                  onChange={(event) => setLocationFilter(event.target.value)}
                  className="h-10 rounded-full border border-border bg-white px-4 text-sm text-text-primary outline-none"
                >
                  {locations.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {statusOptions.map((status) => {
                const active = statusFilter === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-primary text-white"
                        : "bg-secondary text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <DataTable
              columns={columns}
              data={filteredPosts}
              rowKey={(post) => post.id}
              emptyMessage="No posts match the selected filters."
            />
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="surface-card">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-light p-3 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Scheduled Publishing
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-text-secondary">
                    Plan posts ahead of time and manage upcoming publishing
                    activity.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-light p-3 text-primary">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Multi-Location Publishing
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-text-secondary">
                    Organize content across multiple business locations from
                    one workspace.
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-light p-3 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Content History
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-text-secondary">
                    Keep a clear view of published, scheduled, and draft
                    content.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
            {isCreateOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close create post drawer"
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsCreateOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-sm text-text-secondary">Management</p>
                <h2 className="mt-1 text-xl font-semibold text-text-primary">
                  Create Post
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-full p-2 text-text-secondary transition-colors hover:bg-secondary hover:text-text-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <section>
                  <label className="text-sm font-semibold text-text-primary">
                    Post Type
                  </label>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {(["Update", "Offer", "Event"] as const).map((type) => {
                      const active = postType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPostType(type)}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                            active
                              ? "border-primary bg-primary-light text-primary"
                              : "border-border bg-white text-text-secondary hover:border-primary/40 hover:text-text-primary"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <label
                    htmlFor="post-location"
                    className="text-sm font-semibold text-text-primary"
                  >
                    Location
                  </label>

                  <select
                    id="post-location"
                    value={postLocation}
                    onChange={(event) => setPostLocation(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    {locations
                      .filter((location) => location !== "All Locations")
                      .map((location) => (
                        <option key={location}>{location}</option>
                      ))}
                  </select>
                </section>

                <section>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="post-content"
                      className="text-sm font-semibold text-text-primary"
                    >
                      Post Content
                    </label>

                    <span className="text-xs text-text-secondary">
                      {postContent.length} characters
                    </span>
                  </div>

                  <textarea
                    id="post-content"
                    value={postContent}
                    onChange={(event) => setPostContent(event.target.value)}
                    placeholder="Write the content you want to publish..."
                    className="mt-2 min-h-44 w-full resize-y rounded-xl border border-border bg-white p-4 text-sm leading-6 text-text-primary outline-none placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />

                  <p className="mt-2 text-xs text-text-secondary">
                    Keep the message clear and focused on the selected
                    location.
                  </p>
                </section>

                <section>
                  <label className="text-sm font-semibold text-text-primary">
                    Media
                  </label>

                  <div className="mt-2 rounded-2xl border border-dashed border-border bg-secondary/40 p-6 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <ImagePlus className="h-5 w-5" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-text-primary">
                      Add media
                    </p>

                    <p className="mt-1 text-xs text-text-secondary">
                      Upload support will be connected to storage later.
                    </p>

                    <button
                      type="button"
                      className="mt-4 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-secondary"
                    >
                      Choose Image
                    </button>
                  </div>
                </section>

                <section>
                  <label
                    htmlFor="call-to-action"
                    className="text-sm font-semibold text-text-primary"
                  >
                    Call to Action
                  </label>

                  <select
                    id="call-to-action"
                    value={callToAction}
                    onChange={(event) => setCallToAction(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option>Learn more</option>
                    <option>Book</option>
                    <option>Order</option>
                    <option>Shop</option>
                    <option>Sign up</option>
                    <option>Call now</option>
                    <option>None</option>
                  </select>
                </section>

                <section className="rounded-2xl bg-secondary/60 p-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Publishing options
                      </p>
                      <p className="mt-1 text-xs leading-5 text-text-secondary">
                        You can save this post as a draft, schedule it for
                        later, or publish it immediately.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="border-t border-border px-6 py-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-secondary hover:text-text-primary"
                >
                  Cancel
                </button>

                <div className="flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-secondary"
                  >
                    Save Draft
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="rounded-xl border border-primary bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary-light"
                  >
                    Schedule
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    Publish Now
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </AppShell>
  );
}
