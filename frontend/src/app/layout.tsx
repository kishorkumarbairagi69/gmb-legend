
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GMB LEGEND | Local SEO Workspace",
  description:
    "Organize business listings, local keyword research, rank tracking, geo-grid insights, competitor intelligence, and reporting in one local SEO workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
