export const DEFAULT_LOCALE = "th" as const;
export const LOCALE_STORAGE_KEY = "focusshoes-locale";

export const SUPPORTED_LOCALES = ["th", "en", "lo"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_META: Record<
  Locale,
  { label: string; flag: string; locales: string[]; numberLocale: string }
> = {
  th: { label: "ไทย", flag: "🇹🇭", locales: ["th", "th-TH"], numberLocale: "th-TH" },
  en: { label: "English", flag: "🇬🇧", locales: ["en", "en-US", "en-GB"], numberLocale: "en-US" },
  lo: { label: "ລາວ", flag: "🇱🇦", locales: ["lo", "lo-LA"], numberLocale: "lo-LA" },
};

export function matchLocale(input?: string | null): Locale | null {
  if (!input) return null;
  const candidate = input.trim().toLowerCase();
  if (!candidate) return null;

  for (const locale of SUPPORTED_LOCALES) {
    if (candidate === locale || candidate.startsWith(`${locale}-`)) return locale;
  }

  for (const locale of SUPPORTED_LOCALES) {
    if (LOCALE_META[locale].locales.some((value) => value.toLowerCase() === candidate)) {
      return locale;
    }
  }

  return null;
}

export function detectLocale(candidates?: readonly string[]): Locale {
  if (!candidates) return DEFAULT_LOCALE;
  for (const candidate of candidates) {
    const matched = matchLocale(candidate);
    if (matched) return matched;
  }
  return DEFAULT_LOCALE;
}
