"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  // detectLocale,
  type Locale,
} from "@/i18n/locales";

type UiContextValue = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  locale: Locale;
  setLocale: (value: Locale) => void;
};

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  //   const candidates: string[] = [];
  //   if (stored) candidates.push(stored);
  //   if (navigator.languages?.length) candidates.push(...navigator.languages);
  //   if (navigator.language) candidates.push(navigator.language);

  //   const detected = detectLocale(candidates);
  //   setLocale(detected);
  // }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

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
