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

function IconMenuButton({
  label,
  iconSrc,
  children,
}: {
  label: string;
  iconSrc: string;
  children: (close: () => void) => ReactNode;
}) {
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
        title={label}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-8 items-center justify-center rounded-full transition hover:scale-105 active:scale-95"
      >
        <Image
          src={iconSrc}
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
          aria-label={label}
          className="absolute end-0 top-[calc(100%+6px)] z-50 min-w-[148px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--card-shadow)]"
        >
          {children(() => setOpen(false))}
        </div>
      ) : null}
    </div>
  );
}

function MenuOption({
  label,
  active,
  icon,
  onSelect,
}: {
  label: string;
  active: boolean;
  icon?: ReactNode;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onSelect}
      className={`flex w-full items-center gap-2.5 px-3 py-2 text-start text-xs font-semibold transition ${
        active
          ? "bg-[var(--chip-bg)] text-[var(--foreground)]"
          : "text-[var(--muted)] hover:bg-[var(--chip-bg)] hover:text-[var(--foreground)]"
      }`}
    >
      {icon ? (
        <span className="inline-flex size-5 items-center justify-center">
          {icon}
        </span>
      ) : null}
      <span>{label}</span>
      {active ? <span className="ms-auto text-[10px] opacity-60">✓</span> : null}
    </button>
  );
}

function LanguageMenu() {
  const { locale, setLocale, t } = usePrefs();
  const options: { id: Locale; label: string }[] = [
    { id: "en", label: t.english },
    { id: "ar", label: t.arabic },
  ];

  return (
    <IconMenuButton label={t.lang} iconSrc="/brand/icon-language.png">
      {(close) =>
        options.map((opt) => (
          <MenuOption
            key={opt.id}
            label={opt.label}
            active={locale === opt.id}
            onSelect={() => {
              setLocale(opt.id);
              close();
            }}
          />
        ))
      }
    </IconMenuButton>
  );
}

function AppearanceMenu() {
  const { appearance, setAppearance, t } = usePrefs();
  const options: {
    id: Appearance;
    label: string;
    icon: ReactNode;
  }[] = [
    { id: "light", label: t.light, icon: <IconSun className="size-4" /> },
    { id: "dark", label: t.dark, icon: <IconMoon className="size-4" /> },
    { id: "system", label: t.system, icon: <IconSystem className="size-4" /> },
  ];

  return (
    <IconMenuButton label={t.appearance} iconSrc="/brand/icon-appearance.png">
      {(close) =>
        options.map((opt) => (
          <MenuOption
            key={opt.id}
            label={opt.label}
            active={appearance === opt.id}
            icon={opt.icon}
            onSelect={() => {
              setAppearance(opt.id);
              close();
            }}
          />
        ))
      }
    </IconMenuButton>
  );
}

export function TopBar() {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--topbar-bg)]">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-end gap-2.5 px-4 sm:gap-3 sm:px-6">
        <LanguageMenu />
        <AppearanceMenu />
      </div>
    </div>
  );
}
