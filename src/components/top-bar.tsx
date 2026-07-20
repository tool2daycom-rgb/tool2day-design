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

/** شمس ملوّنة — للوضع النهاري */
function IconSun({ className = "", gid = "sun" }: { className?: string; gid?: string }) {
  const glowId = `${gid}-glow`;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.1" fill="#F5C518" />
      <circle cx="12" cy="12" r="4.1" fill={`url(#${glowId})`} opacity="0.45" />
      <g stroke="#FF8A1F" strokeWidth="1.85" strokeLinecap="round">
        <path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1" />
        <path d="M5.05 5.05l1.5 1.5M17.45 17.45l1.5 1.5M5.05 18.95l1.5-1.5M17.45 6.55l1.5-1.5" />
      </g>
      <defs>
        <radialGradient id={glowId} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFF6B0" />
          <stop offset="100%" stopColor="#F5C518" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** هلال ملوّن مع نجمة — للوضع الليلي */
function IconCrescent({
  className = "",
  gid = "moon",
}: {
  className?: string;
  gid?: string;
}) {
  const glowId = `${gid}-glow`;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15.8 4.4a7.7 7.7 0 1 0 3.9 13.55A8.35 8.35 0 1 1 15.8 4.4Z"
        fill={`url(#${glowId})`}
      />
      <path
        d="M17.6 7.15l.55 1.15 1.25.2-.9.9.2 1.25-1.1-.55-1.1.55.2-1.25-.9-.9 1.25-.2.55-1.15Z"
        fill="#FDE68A"
      />
      <defs>
        <linearGradient id={glowId} x1="8" y1="5" x2="18" y2="20">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconSystem({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="2" fill="#94A3B8" />
      <rect x="5" y="6" width="14" height="8" rx="1" fill="#0F172A" />
      <path
        d="M8.5 19.25h7M12 16v3.25"
        stroke="#64748B"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="9.2" cy="10" r="0.9" fill="#F5C518" />
      <circle cx="12" cy="10" r="0.9" fill="#7DD3FC" />
      <circle cx="14.8" cy="10" r="0.9" fill="#A78BFA" />
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
  const { appearance, setAppearance, theme, t } = usePrefs();
  // الزر يعكس الوضع الفعلي (بما فيه نظام الجهاز)
  const triggerIcon =
    theme === "light" ? (
      <IconSun className="size-[18px]" gid="sun-trigger" />
    ) : (
      <IconCrescent className="size-[18px]" gid="moon-trigger" />
    );

  const options: {
    id: Appearance;
    label: string;
    icon: ReactNode;
  }[] = [
    {
      id: "light",
      label: t.light,
      icon: <IconSun className="size-4" gid="sun-menu" />,
    },
    {
      id: "dark",
      label: t.dark,
      icon: <IconCrescent className="size-4" gid="moon-menu" />,
    },
    { id: "system", label: t.system, icon: <IconSystem className="size-4" /> },
  ];

  return (
    <IconMenuButton label={t.appearance} icon={triggerIcon}>
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

export function PrefsControls({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <LanguageMenu />
      <AppearanceMenu />
    </div>
  );
}

export function TopBar() {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--topbar-bg)]">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-end gap-2 px-4 sm:gap-2.5 sm:px-6">
        <PrefsControls />
      </div>
    </div>
  );
}
