import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://design.tool2day.com"),
  title: {
    default: "Tool2Day Design — UI/UX templates for web & apps",
    template: "%s · Tool2Day Design",
  },
  description:
    "Browse and buy Bento-style UI/UX templates for websites and mobile apps. Part of Tool2Day.",
  openGraph: {
    title: "Tool2Day Design",
    description: "UI/UX templates for web & apps — Bento-inspired gallery.",
    url: "https://design.tool2day.com",
    siteName: "Tool2Day Design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white">{children}</body>
    </html>
  );
}
