"use client";

import type { ReactNode } from "react";
import { usePrefs } from "@/components/prefs-provider";
import type { Appearance, Locale } from "@/lib/prefs";

function IconSun({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.05 5.05l1.56 1.56M17.39 17.39l1.56 1.56M5.05 18.95l1.56-1.56M17.39 6.61l1.56-1.56"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19.5 13.2A7.5 7.5 0 0 1 10.8 4.5 7.6 7.6 0 1 0 19.5 13.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSystem({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 20h8M12 16.5V20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const appearanceIcons: Record<Appearance, ReactNode> = {
  light: <IconSun className="size-3.5" />,
  dark: <IconMoon className="size-3.5" />,
  system: <IconSystem className="size-3.5" />,
};

function IconButtonGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string; icon: ReactNode }[];
  onChange: (id: T) => void;
}) {
  return (
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
            title={opt.label}
            aria-label={opt.label}
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={`inline-flex size-7 items-center justify-center rounded-full transition ${
              active
                ? "bg-[var(--chip-active-bg)] text-[var(--chip-active-fg)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}

export function TopBar() {
  const { locale, setLocale, appearance, setAppearance, t } = usePrefs();

  return (
    <div className="border-b border-[var(--border)] bg-[var(--topbar-bg)]">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-end gap-2.5 px-4 sm:gap-3 sm:px-6">
        <IconButtonGroup
          label={t.lang}
          value={locale}
          options={[
            {
              id: "en" as Locale,
              label: t.english,
              icon: (
                <span className="text-[10px] font-bold leading-none tracking-wide">
                  EN
                </span>
              ),
            },
            {
              id: "ar" as Locale,
              label: t.arabic,
              icon: (
                <span className="text-[11px] font-bold leading-none">ع</span>
              ),
            },
          ]}
          onChange={setLocale}
        />
        <IconButtonGroup
          label={t.appearance}
          value={appearance}
          options={[
            { id: "light" as Appearance, label: t.light, icon: appearanceIcons.light },
            { id: "dark" as Appearance, label: t.dark, icon: appearanceIcons.dark },
            { id: "system" as Appearance, label: t.system, icon: appearanceIcons.system },
          ]}
          onChange={setAppearance}
        />
      </div>
    </div>
  );
}
