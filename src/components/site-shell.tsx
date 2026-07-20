"use client";

import Image from "next/image";
import { Gallery } from "@/components/gallery";
import { DesignBrandMark } from "@/components/design-brand-mark";
import { PrefsControls } from "@/components/top-bar";
import { usePrefs } from "@/components/prefs-provider";

export function SiteShell() {
  const { t, theme } = usePrefs();
  const heroLogo =
    theme === "dark"
      ? "/brand/logo-design-hero-dark.png"
      : "/brand/logo-design-hero.png";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <a
              href="/"
              className="inline-flex min-w-0 items-center gap-2.5 font-extrabold tracking-tight sm:gap-3"
            >
              <DesignBrandMark size={34} animated />
              <span className="truncate text-base sm:text-lg">
                tool2day
                <span className="font-semibold text-[var(--muted)]">
                  {" "}
                  design
                </span>
              </span>
            </a>
            <a
              href="https://tool2day.com"
              className="shrink-0 rounded-full bg-[#f5c518] px-3 py-1.5 text-[11px] font-bold text-[#111] transition hover:brightness-110 sm:px-3.5 sm:text-xs"
            >
              {t.getTemplates}
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden text-xs text-[var(--muted)] lg:inline">
              {t.tagline}
            </span>
            <PrefsControls />
          </div>
        </div>
      </header>

      <main className="pt-8">
        <div className="mx-auto mb-10 flex max-w-[1400px] flex-col items-center px-4 text-center sm:px-6">
          <Image
            src={heroLogo}
            alt="TOOL 2 DAY"
            width={740}
            height={154}
            priority
            unoptimized
            className="h-auto w-full max-w-[min(94vw,620px)] bg-transparent object-contain"
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
