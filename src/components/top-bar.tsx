"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefs } from "@/components/prefs-provider";
import type { Appearance, Locale } from "@/lib/prefs";

function IconSun({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.75v1.9M12 19.35v1.9M2.75 12h1.9M19.35 12h1.9M5.2 5.2l1.35 1.35M17.45 17.45l1.35 1.35M5.2 18.8l1.35-1.35M17.45 6.55l1.35-1.35"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19.25 13.35A7.35 7.35 0 0 1 10.65 4.75 7.5 7.5 0 1 0 19.25 13.35Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSystem({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.75"
        y="4.75"
        width="16.5"
        height="11.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 19.25h7M12 16.25v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGlobe({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.75 12h16.5M12 3.75c2.35 2.55 3.5 5.35 3.5 8.25s-1.15 5.7-3.5 8.25M12 3.75C9.65 6.3 8.5 9.1 8.5 12s1.15 5.7 3.5 8.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const appearanceIcons: Record<Appearance, ReactNode> = {
  light: <IconSun className="size-[18px]" />,
  dark: <IconMoon className="size-[18px]" />,
  system: <IconSystem className="size-[18px]" />,
};

function IconMenuButton({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
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
        className={`inline-flex size-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--chip-bg)] text-[var(--foreground)] transition hover:bg-[var(--surface)] ${
          open ? "ring-1 ring-[var(--foreground)]/20" : ""
        }`}
      >
        {icon}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute end-0 top-[calc(100%+6px)] z-50 min-w-[156px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--card-shadow)]"
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
    <IconMenuButton label={t.lang} icon={<IconGlobe className="size-[18px]" />}>
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
    <IconMenuButton label={t.appearance} icon={appearanceIcons[appearance]}>
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
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-end gap-2 px-4 sm:gap-2.5 sm:px-6">
        <LanguageMenu />
        <AppearanceMenu />
      </div>
    </div>
  );
}
