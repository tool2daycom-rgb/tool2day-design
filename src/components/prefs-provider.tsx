"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMessages, type Messages } from "@/lib/i18n";
import {
  APPEARANCE_KEY,
  LOCALE_KEY,
  isAppearance,
  isLocale,
  readSystemDark,
  resolveTheme,
  type Appearance,
  type Locale,
  type ResolvedTheme,
} from "@/lib/prefs";

type PrefsContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  appearance: Appearance;
  setAppearance: (appearance: Appearance) => void;
  theme: ResolvedTheme;
  t: Messages;
  dir: "ltr" | "rtl";
};

const PrefsContext = createContext<PrefsContextValue | null>(null);

function applyDom(locale: Locale, theme: ResolvedTheme) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "ar" ? "rtl" : "ltr";
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.dataset.theme = theme;
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [appearance, setAppearanceState] = useState<Appearance>("system");
  const [systemDark, setSystemDark] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_KEY);
    const storedAppearance = window.localStorage.getItem(APPEARANCE_KEY);
    const nextLocale = isLocale(storedLocale)
      ? storedLocale
      : navigator.language.toLowerCase().startsWith("ar")
        ? "ar"
        : "en";
    const nextAppearance = isAppearance(storedAppearance)
      ? storedAppearance
      : "system";
    const dark = readSystemDark();
    setLocaleState(nextLocale);
    setAppearanceState(nextAppearance);
    setSystemDark(dark);
    applyDom(nextLocale, resolveTheme(nextAppearance, dark));
    setReady(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const theme = resolveTheme(appearance, systemDark);

  useEffect(() => {
    if (!ready) return;
    applyDom(locale, theme);
  }, [locale, theme, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_KEY, next);
  }, []);

  const setAppearance = useCallback((next: Appearance) => {
    setAppearanceState(next);
    window.localStorage.setItem(APPEARANCE_KEY, next);
  }, []);

  const value = useMemo<PrefsContextValue>(
    () => ({
      locale,
      setLocale,
      appearance,
      setAppearance,
      theme,
      t: getMessages(locale),
      dir: locale === "ar" ? "rtl" : "ltr",
    }),
    [locale, setLocale, appearance, setAppearance, theme],
  );

  return (
    <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used within PrefsProvider");
  return ctx;
}
