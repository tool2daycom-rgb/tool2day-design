"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
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

const appearanceMenu: {
  id: Appearance;
  labelKey: "light" | "dark" | "system";
  icon: ReactNode;
}[] = [
  { id: "light", labelKey: "light", icon: <IconSun className="size-4" /> },
  { id: "dark", labelKey: "dark", icon: <IconMoon className="size-4" /> },
  { id: "system", labelKey: "system", icon: <IconSystem className="size-4" /> },
];

function LangButtons() {
  const { locale, setLocale, t } = usePrefs();
  const options: { id: Locale; label: string; short: string }[] = [
    { id: "en", label: t.english, short: "EN" },
    { id: "ar", label: t.arabic, short: "ع" },
  ];

  return (
    <div
      className="inline-flex rounded-full border border-[var(--border)] bg-[var(--chip-bg)] p-0.5"
      role="group"
      aria-label={t.lang}
    >
      {options.map((opt) => {
        const active = locale === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            title={opt.label}
            aria-label={opt.label}
            aria-pressed={active}
            onClick={() => setLocale(opt.id)}
            className={`inline-flex size-7 items-center justify-center rounded-full transition ${
              active
                ? "bg-[var(--chip-active-bg)] text-[var(--chip-active-fg)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <span className="text-[10px] font-bold leading-none tracking-wide">
              {opt.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AppearanceMenu() {
  const { appearance, setAppearance, t } = usePrefs();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        title={t.appearance}
        aria-label={t.appearance}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-8 items-center justify-center rounded-full transition hover:scale-105 active:scale-95"
      >
        <Image
          src="/brand/icon-appearance.png"
          alt=""
          width={28}
          height={28}
          className="size-7 object-contain"
          priority
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={t.appearance}
          className="absolute end-0 top-[calc(100%+6px)] z-50 min-w-[148px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--card-shadow)]"
        >
          {appearanceMenu.map((opt) => {
            const active = appearance === opt.id;
            const label = t[opt.labelKey];
            return (
              <button
                key={opt.id}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setAppearance(opt.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-start text-xs font-semibold transition ${
                  active
                    ? "bg-[var(--chip-bg)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--chip-bg)] hover:text-[var(--foreground)]"
                }`}
              >
                <span className="inline-flex size-5 items-center justify-center">
                  {opt.icon}
                </span>
                <span>{label}</span>
                {active ? (
                  <span className="ms-auto text-[10px] opacity-60">✓</span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function TopBar() {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--topbar-bg)]">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-end gap-2.5 px-4 sm:gap-3 sm:px-6">
        <LangButtons />
        <AppearanceMenu />
      </div>
    </div>
  );
}
