"use client";

import { useEffect, useMemo, useState } from "react";
import {
  templates,
  type DesignTemplate,
  type TemplateCategory,
  type ThemeMode,
} from "@/lib/templates";
import { BentoPreview } from "@/components/bento-preview";
import { usePrefs } from "@/components/prefs-provider";

function categoryFromQuery(): "all" | TemplateCategory {
  if (typeof window === "undefined") return "all";
  const raw = new URLSearchParams(window.location.search).get("category");
  if (raw === "web" || raw === "app" || raw === "ui") return raw;
  return "all";
}

export function Gallery() {
  const { t } = usePrefs();
  const [category, setCategory] = useState<"all" | TemplateCategory>("all");
  const [theme, setTheme] = useState<"all" | ThemeMode>("dark");

  const categories: { id: "all" | TemplateCategory; label: string }[] = [
    { id: "all", label: t.discover },
    { id: "web", label: t.webDesign },
    { id: "app", label: t.appUi },
    { id: "ui", label: t.uiKits },
  ];

  const themes: { id: "all" | ThemeMode; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "dark", label: t.filterDark },
    { id: "light", label: t.filterLight },
  ];

  useEffect(() => {
    setCategory(categoryFromQuery());
  }, []);

  const filtered = useMemo(() => {
    return templates.filter((item) => {
      const catOk = category === "all" || item.category === category;
      const themeOk = theme === "all" || item.theme === theme;
      return catOk && themeOk;
    });
  }, [category, theme]);

  function selectCategory(next: "all" | TemplateCategory) {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState({}, "", url.toString());
  }

  function formatPrice(price: DesignTemplate["price"]) {
    if (price === "free") return t.free;
    return `$${price}`;
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-20 sm:px-6">
      <div className="sticky top-[93px] z-30 -mx-4 mb-6 border-y border-[var(--border)] bg-[var(--surface-2)]/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => {
              const isActive = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectCategory(c.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--filter-active-bg)] text-[var(--filter-active-fg)]"
                      : "bg-[var(--chip-bg)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--chip-bg)] p-0.5">
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  theme === item.id
                    ? "bg-[var(--chip-active-bg)] text-[var(--chip-active-fg)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-[1.35rem] border border-[var(--card-border)] bg-[var(--surface)] shadow-[var(--card-shadow)] transition hover:-translate-y-0.5"
          >
            {item.variants ? (
              <span className="absolute end-3 top-3 z-10 inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-black/70 px-1.5 text-xs font-bold text-white backdrop-blur">
                {item.variants}
              </span>
            ) : null}
            <div className="aspect-[4/3.2] overflow-hidden">
              <BentoPreview item={item} />
            </div>
            <div className="flex items-start justify-between gap-3 border-t border-[var(--border)] px-3.5 py-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">
                  {item.title}
                </h2>
                <p className="mt-0.5 truncate text-[11px] text-[var(--muted)]">
                  {item.tags.join(" · ")}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  item.price === "free"
                    ? "bg-emerald-400/15 text-emerald-600 dark:text-emerald-300"
                    : "bg-[#f5c518]/15 text-[#b45309] dark:text-[#f5c518]"
                }`}
              >
                {formatPrice(item.price)}
              </span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-[var(--muted)]">
          {t.empty}
        </p>
      ) : null}
    </div>
  );
}
