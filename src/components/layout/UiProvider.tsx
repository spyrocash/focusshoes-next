"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

type UiContextValue = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  locale: Locale;
  setLocale: (value: Locale) => void;
};

const UiContext = createContext<UiContextValue | null>(null);

type UiProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export function UiProvider({ children, initialLocale }: UiProviderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (!initialLocale) return;
    setLocale(initialLocale);
  }, [initialLocale]);

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen, locale, setLocale }),
    [menuOpen, locale],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUi must be used within UiProvider");
  }
  return context;
}
