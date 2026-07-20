"use client";

import { usePrefs } from "@/components/prefs-provider";
import type { Appearance, Locale } from "@/lib/prefs";

const localeOptions: { id: Locale; labelKey: "english" | "arabic" }[] = [
  { id: "en", labelKey: "english" },
  { id: "ar", labelKey: "arabic" },
];

const appearanceOptions: {
  id: Appearance;
  labelKey: "light" | "dark" | "system";
}[] = [
  { id: "light", labelKey: "light" },
  { id: "dark", labelKey: "dark" },
  { id: "system", labelKey: "system" },
];

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="hidden text-[11px] font-medium text-[var(--muted)] sm:inline">
        {label}
      </span>
      <div
        className="inline-flex rounded-full border border-[var(--border)] bg-[var(--chip-bg)] p-0.5"
        role="group"
        aria-label={label}
      >
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                active
                  ? "bg-[var(--chip-active-bg)] text-[var(--chip-active-fg)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TopBar() {
  const { locale, setLocale, appearance, setAppearance, t } = usePrefs();

  return (
    <div className="border-b border-[var(--border)] bg-[var(--topbar-bg)]">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-end gap-3 px-4 sm:gap-5 sm:px-6">
        <Segmented
          label={t.lang}
          value={locale}
          options={localeOptions.map((o) => ({
            id: o.id,
            label: t[o.labelKey],
          }))}
          onChange={setLocale}
        />
        <Segmented
          label={t.appearance}
          value={appearance}
          options={appearanceOptions.map((o) => ({
            id: o.id,
            label: t[o.labelKey],
          }))}
          onChange={setAppearance}
        />
      </div>
    </div>
  );
}
