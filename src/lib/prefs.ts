export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const appearances = ["light", "dark", "system"] as const;
export type Appearance = (typeof appearances)[number];
export type ResolvedTheme = "light" | "dark";

export const LOCALE_KEY = "t2d-design-locale";
export const APPEARANCE_KEY = "t2d-design-appearance";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function isAppearance(
  value: string | null | undefined,
): value is Appearance {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveTheme(
  appearance: Appearance,
  systemDark: boolean,
): ResolvedTheme {
  if (appearance === "system") return systemDark ? "dark" : "light";
  return appearance;
}

export function readSystemDark(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
