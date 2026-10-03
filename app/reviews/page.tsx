"use client";

import { useMemo, useState } from "react";
import {
  MessageSquare,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { DataTable } from "@/components/ui/DataTable";
import { KPICard } from "@/components/ui/KPICard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Review = {
  id: number;
  reviewer: string;
  location: string;
  rating: number;
  review: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  date: string;
  replyStatus: "Replied" | "Needs Reply";
  reply?: string;
};

const initialReviews: Review[] = [
  {
    id: 1,
    reviewer: "Sarah Mitchell",
    location: "Downtown Central",
    rating: 5,
    review:
      "Excellent service and a very professional team. Everything was handled quickly.",
    sentiment: "Positive",
    date: "Jun 18, 2026",
    replyStatus: "Replied",
    reply:
      "Thank you for your kind feedback, Sarah. We really appreciate you taking the time to share your experience.",
  },
  {
    id: 2,
    reviewer: "Michael Turner",
    location: "Downtown North",
    rating: 4,
    review:
      "Good experience overall. The team was helpful and the location was easy to find.",
    sentiment: "Positive",
    date: "Jun 17, 2026",
    replyStatus: "Needs Reply",
  },
  {
    id: 3,
    reviewer: "Jessica Brown",
    location: "Market Square",
    rating: 5,
    review:
      "Fantastic experience from start to finish. The staff were friendly and professional.",
    sentiment: "Positive",
    date: "Jun 16, 2026",
    replyStatus: "Replied",
    reply:
      "Thanks so much, Jessica. We're glad you had a fantastic experience.",
  },
  {
    id: 4,
    reviewer: "David Wilson",
    location: "Downtown Central",
    rating: 3,
    review:
      "The service was okay, but the wait time was longer than expected.",
    sentiment: "Neutral",
    date: "Jun 15, 2026",
    replyStatus: "Needs Reply",
  },
  {
    id: 5,
    reviewer: "Emily Davis",
    location: "Downtown South",
    rating: 5,
    review:
      "Very helpful team and excellent communication. I would definitely return.",
    sentiment: "Positive",
    date: "Jun 14, 2026",
    replyStatus: "Replied",
    reply:
      "Thank you, Emily. We appreciate your recommendation and look forward to seeing you again.",
  },
  {
    id: 6,
    reviewer: "Robert Johnson",
    location: "Market Square",
    rating: 2,
    review:
      "The experience could have been better. I had difficulty getting assistance.",
    sentiment: "Negative",
    date: "Jun 13, 2026",
    replyStatus: "Needs Reply",
  },
];

const ratingDistribution = [
  { label: "5 Stars", value: 310 },
  { label: "4 Stars", value: 74 },
  { label: "3 Stars", value: 26 },
  { label: "2 Stars", value: 11 },
  { label: "1 Star", value: 6 },
];

const reviewTrend = [
  { label: "Jan", value: 54 },
  { label: "Feb", value: 61 },
  { label: "Mar", value: 68 },
  { label: "Apr", value: 74 },
  { label: "May", value: 82 },
  { label: "Jun", value: 91 },
];

const sentimentSummary = [
  { label: "Positive", value: "72%" },
  { label: "Neutral", value: "18%" },
  { label: "Negative", value: "10%" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [drawerMode, setDrawerMode] = useState<"view" | "reply">("view");
  const [replyText, setReplyText] = useState("");

  const openView = (review: Review) => {
    setSelectedReview(review);
    setDrawerMode("view");
    setReplyText(review.reply ?? "");
  };

  const openReply = (review: Review) => {
    setSelectedReview(review);
    setDrawerMode("reply");
    setReplyText(review.reply ?? "");
  };

  const closeDrawer = () => {
    setSelectedReview(null);
    setReplyText("");
  };

  const sendReply = () => {
    if (!selectedReview || !replyText.trim()) {
      return;
    }

    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === selectedReview.id
          ? {
              ...review,
              replyStatus: "Replied",
              reply: replyText.trim(),
            }
          : review,
      ),
    );

    setSelectedReview((currentReview) =>
      currentReview
        ? {
            ...currentReview,
            replyStatus: "Replied",
            reply: replyText.trim(),
          }
        : null,
    );

    setDrawerMode("view");
  };

  const reviewColumns = useMemo(
    () => [
      {
        key: "reviewer",
        header: "Reviewer",
        render: (review: Review) => (
          <div>
            <p className="font-semibold text-text-primary">{review.reviewer}</p>
            <p className="mt-1 text-xs text-text-secondary">
              {review.location}
            </p>
          </div>
        ),
      },
      {
        key: "rating",
        header: "Rating",
        render: (review: Review) => (
          <div className="flex items-center gap-1.5 font-semibold text-text-primary">
            <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
            {review.rating.toFixed(1)}
          </div>
        ),
      },
      {
        key: "review",
        header: "Review",
        render: (review: Review) => (
          <p className="max-w-[420px] truncate text-text-secondary">
            {review.review}
          </p>
        ),
      },
      {
        key: "sentiment",
        header: "Sentiment",
        render: (review: Review) => (
<StatusBadge
  status={
    review.sentiment === "Positive"
      ? "success"
      : review.sentiment === "Neutral"
        ? "info"
        : "error"
  }
>
  {review.sentiment}
</StatusBadge>        ),
      },
      {
        key: "date",
        header: "Date",
        render: (review: Review) => (
          <span className="text-text-secondary">{review.date}</span>
        ),
      },
      {
        key: "replyStatus",
        header: "Reply",
        render: (review: Review) => (
<StatusBadge
  status={
    review.replyStatus === "Replied" ? "success" : "warning"
  }
>
  {review.replyStatus}
</StatusBadge>        ),
      },
      {
        key: "action",
        header: "Action",
        render: (review: Review) => (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openView(review)}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              View
            </button>

            {review.replyStatus === "Needs Reply" && (
              <button
                type="button"
                onClick={() => openReply(review)}
                className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
              >
                Reply
              </button>
            )}
          </div>
        ),
      },
    ],
    [],
  );

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
                Reviews
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Monitor customer feedback, sentiment, ratings, and response
                activity across your locations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <SecondaryButton>All Locations</SecondaryButton>
              <SecondaryButton>Last 30 Days</SecondaryButton>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
<KPICard
  label="Total Reviews"
  value="4,286"
  supportingText="Across all locations"
  icon={<MessageSquare className="h-5 w-5" />}
/>           
 <KPICard
  label="Average Rating"
  value="4.7"
  supportingText="Across all locations"
  icon={<Star className="h-5 w-5" />}
/>

<KPICard
  label="Response Rate"
  value="91%"
  supportingText="Reviews with a reply"
  icon={<MessageSquare className="h-5 w-5" />}
/>

<KPICard
  label="Positive Sentiment"
  value="72%"
  supportingText="Basic sentiment analysis"
  icon={<ThumbsUp className="h-5 w-5" />}
/>
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="surface-card xl:col-span-1">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-text-primary">
                  Rating Distribution
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Distribution of ratings across all locations.
                </p>
              </div>
              <BarChart data={ratingDistribution} height={270} />
            </div>

            <div className="surface-card xl:col-span-2">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-text-primary">
                  Review Trend
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Illustrative monthly review volume.
                </p>
              </div>
              <LineChart data={reviewTrend} height={270} />
            </div>
          </section>

          <section className="surface-card">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">
                  Sentiment Overview
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Basic sentiment distribution across recent reviews.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-[#F1F3F8] px-4 py-3">
                  <div className="rounded-full bg-[#DCFCE7] p-2 text-[#22C55E]">
                    <ThumbsUp className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {sentimentSummary[0].value}
                    </p>
                    <p className="text-xs text-text-secondary">Positive</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-[#F1F3F8] px-4 py-3">
                  <div className="rounded-full bg-[#DBEAFE] p-2 text-[#3B82F6]">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {sentimentSummary[1].value}
                    </p>
                    <p className="text-xs text-text-secondary">Neutral</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-[#F1F3F8] px-4 py-3">
                  <div className="rounded-full bg-[#FEE2E2] p-2 text-[#EF4444]">
                    <ThumbsDown className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {sentimentSummary[2].value}
                    </p>
                    <p className="text-xs text-text-secondary">Negative</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">
                  Recent Reviews
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Review activity across your locations.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 shadow-sm">
                  <Search className="h-4 w-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search reviews"
                    className="w-36 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
                  />
                </div>
                <SecondaryButton>Filters</SecondaryButton>
              </div>
            </div>

            <DataTable
              columns={reviewColumns}
              data={reviews}
rowKey={(review) => String(review.id)}            />
          </section>
        </div>
      </main>

      {selectedReview && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close review drawer"
            className="absolute inset-0 bg-black/30"
            onClick={closeDrawer}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-sm text-text-secondary">
                  {selectedReview.location}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-text-primary">
                  {drawerMode === "reply" ? "Reply to Review" : "Review Details"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-full p-2 text-text-secondary transition-colors hover:bg-[#F1F3F8] hover:text-text-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="rounded-2xl border border-border bg-[#F7F8FC] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text-primary">
                      {selectedReview.reviewer}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {selectedReview.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-text-primary">
                    <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    {selectedReview.rating.toFixed(1)}
                  </div>
                </div>

                <div className="mt-4">
<StatusBadge
  status={
    selectedReview.sentiment === "Positive"
      ? "success"
      : selectedReview.sentiment === "Neutral"
        ? "info"
        : "error"
  }
>
  {selectedReview.sentiment}
</StatusBadge>                </div>

                <p className="mt-5 text-sm leading-6 text-text-primary">
                  {selectedReview.review}
                </p>
              </div>

              {drawerMode === "view" && selectedReview.reply && (
                <div className="mt-5 rounded-2xl border border-border p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary">
                      Your Reply
                    </h3>
<StatusBadge status="success">Replied</StatusBadge>                  </div>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {selectedReview.reply}
                  </p>
                </div>
              )}

              {drawerMode === "reply" && (
                <div className="mt-5">
                  <label
                    htmlFor="review-reply"
                    className="text-sm font-semibold text-text-primary"
                  >
                    Response
                  </label>

                  <textarea
                    id="review-reply"
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    placeholder="Write a thoughtful response to this review..."
                    className="mt-2 min-h-40 w-full resize-y rounded-2xl border border-border bg-white p-4 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />

                  <p className="mt-2 text-xs text-text-secondary">
                    Frontend-only draft. Publishing to Google will be connected
                    in the backend integration phase.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-border px-6 py-5">
              {drawerMode === "reply" ? (
                <div className="flex justify-end gap-3">
                  <SecondaryButton onClick={closeDrawer}>
                    Cancel
                  </SecondaryButton>

                  <SecondaryButton
                    onClick={() => {
                      if (replyText.trim()) {
                        setSelectedReview((currentReview) =>
                          currentReview
                            ? {
                                ...currentReview,
                                reply: replyText.trim(),
                              }
                            : null,
                        );
                      }
                    }}
                  >
                    Save Draft
                  </SecondaryButton>

                  <button
                    type="button"
                    onClick={sendReply}
                    disabled={!replyText.trim()}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send Reply
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-3">
                  <SecondaryButton onClick={closeDrawer}>
                    Close
                  </SecondaryButton>

                  {selectedReview.replyStatus === "Needs Reply" && (
                    <button
                      type="button"
                      onClick={() => setDrawerMode("reply")}
                      className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                      Reply
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </AppShell>
  );
}
