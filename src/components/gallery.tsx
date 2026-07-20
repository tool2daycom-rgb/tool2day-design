"use client";

import { useMemo, useState } from "react";
import {
  templates,
  type DesignTemplate,
  type TemplateCategory,
  type ThemeMode,
} from "@/lib/templates";
import { BentoPreview } from "@/components/bento-preview";

const categories: { id: "all" | TemplateCategory; label: string }[] = [
  { id: "all", label: "Discover" },
  { id: "web", label: "Web Design" },
  { id: "app", label: "App UI" },
  { id: "ui", label: "UI Kits" },
];

const themes: { id: "all" | ThemeMode; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
];

function formatPrice(price: DesignTemplate["price"]) {
  if (price === "free") return "Free";
  return `$${price}`;
}

export function Gallery() {
  const [category, setCategory] = useState<"all" | TemplateCategory>("all");
  const [theme, setTheme] = useState<"all" | ThemeMode>("dark");

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const catOk = category === "all" || t.category === category;
      const themeOk = theme === "all" || t.theme === theme;
      return catOk && themeOk;
    });
  }, [category, theme]);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-20 sm:px-6">
      <div className="sticky top-[57px] z-30 -mx-4 mb-6 border-y border-white/10 bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => {
              const isActive = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#c8e7ff] text-[#0a0a0a]"
                      : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-0.5">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  theme === t.id
                    ? "bg-white text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#111113] shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-white/20"
          >
            {item.variants ? (
              <span className="absolute end-3 top-3 z-10 inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-black/70 px-1.5 text-xs font-bold text-white backdrop-blur">
                {item.variants}
              </span>
            ) : null}
            <div className="aspect-[4/3.2] overflow-hidden">
              <BentoPreview item={item} />
            </div>
            <div className="flex items-start justify-between gap-3 border-t border-white/10 px-3.5 py-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-0.5 truncate text-[11px] text-white/45">
                  {item.tags.join(" · ")}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  item.price === "free"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-[#f5c518]/15 text-[#f5c518]"
                }`}
              >
                {formatPrice(item.price)}
              </span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-white/50">
          No templates in this filter yet — more coming soon.
        </p>
      ) : null}
    </div>
  );
}
