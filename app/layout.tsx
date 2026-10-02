import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GMB Legend",
  description: "Google Business Profile and Local SEO management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}