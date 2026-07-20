"use client";

import Image from "next/image";
import { Gallery } from "@/components/gallery";
import { DesignBrandMark } from "@/components/design-brand-mark";
import { TopBar } from "@/components/top-bar";
import { usePrefs } from "@/components/prefs-provider";

export function SiteShell() {
  const { t } = usePrefs();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="sticky top-0 z-40">
        <TopBar />
        <header className="border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-2.5 font-extrabold tracking-tight"
              >
                <DesignBrandMark size={24} animated />
                <span>
                  tool2day
                  <span className="font-semibold text-[var(--muted)]">
                    {" "}
                    design
                  </span>
                </span>
              </a>
              <a
                href="https://tool2day.com"
                className="hidden rounded-full border border-[var(--border)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]/80 transition hover:opacity-90 sm:inline-flex"
              >
                {t.tools}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-[var(--muted)] md:inline">
                {t.tagline}
              </span>
              <a
                href="https://tool2day.com"
                className="rounded-full bg-[#f5c518] px-3.5 py-1.5 text-xs font-bold text-[#111] transition hover:brightness-110"
              >
                {t.getTemplates}
              </a>
            </div>
          </div>
        </header>
      </div>

      <main className="pt-8">
        <div className="mx-auto mb-10 flex max-w-[1400px] flex-col items-center px-4 text-center sm:px-6">
          <Image
            src="/brand/logo-hero-eyes.png"
            alt="TOOL 2 DAY"
            width={700}
            height={154}
            priority
            className="h-auto w-full max-w-[min(92vw,560px)] object-contain dark:brightness-110"
          />
          <h1 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.heroTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--hero-muted)]">
            {t.heroBody}
          </p>
        </div>
        <Gallery />
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} {t.footer} ·{" "}
        <a href="https://tool2day.com" className="underline hover:opacity-80">
          tool2day.com
        </a>
      </footer>
    </div>
  );
}
