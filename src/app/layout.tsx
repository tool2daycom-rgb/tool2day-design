import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand-mark.svg", type: "image/svg+xml" },
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const themeBootScript = `
(function(){
  try {
    var appearance = localStorage.getItem('t2d-design-appearance') || 'system';
    var locale = localStorage.getItem('t2d-design-locale');
    if (locale !== 'ar' && locale !== 'en') {
      locale = (navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
    }
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = appearance === 'system' ? (systemDark ? 'dark' : 'light') : appearance;
    var root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    root.classList.add(theme);
    root.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
