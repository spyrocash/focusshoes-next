export const DEFAULT_LOCALE = "th" as const;

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

export function formatNumber(value: number, locale: Locale) {
  const separator = locale === "lo" ? "." : ",";
  const absValue = Math.abs(value);
  const [intPart, fractionPart] = absValue.toString().split(".");
  const withSeparators = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const sign = value < 0 ? "-" : "";

  if (fractionPart) {
    return `${sign}${withSeparators}.${fractionPart}`;
  }

  return `${sign}${withSeparators}`;
}
