"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ClockIcon,
  FacebookIcon,
  LineIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from "@/components/icons";
import { LOCALE_META, SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";
import { useTranslations } from "@/i18n/useTranslations";
import { useUi } from "@/components/layout/UiProvider";

export function Header() {
  const { menuOpen, setMenuOpen, locale, setLocale } = useUi();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();

  const activeLocale = useMemo(() => LOCALE_META[locale], [locale]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!languageOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [languageOpen]);

  const handleLocaleSelect = (value: Locale) => {
    setLocale(value);
    setLanguageOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface-veil)] text-[var(--foreground)] shadow-lg backdrop-blur">
      <div className="px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t("headerTitle")}</h1>
            <p className="text-xs text-[var(--muted)]">{t("headerTagline")}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguageOpen(true)}
              // className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--primary)]/10"
              className="flex items-center gap-2 px-2 py-1 text-xl font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--primary)]/10"
              aria-label={t("headerLanguageLabel")}
              aria-haspopup="dialog"
            >
              <span aria-hidden="true">{activeLocale.flag}</span>
              {/* <span className="uppercase">{locale}</span> */}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-[var(--primary)]/10"
              aria-label={t("headerMenuToggleLabel")}
            >
              {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 sm:px-6">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-[var(--primary)]" />
              <a
                href="tel:+66926644624"
                className="underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("headerContactPhone")}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-[var(--primary)]" />
              <span>{t("headerContactAddress")}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-[var(--primary)]" />
              <span>{t("headerContactHours")}</span>
            </div>
            <div className="flex items-center gap-2">
              <FacebookIcon className="h-4 w-4 text-[var(--primary)]" />
              <a
                href="https://www.facebook.com/focusshoes.th"
                className="underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("headerContactFacebook")}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LineIcon className="h-4 w-4 text-[var(--primary)]" />
              <a
                href="https://line.me/R/ti/p/focusshoes"
                className="underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("headerContactLine")}
              </a>
            </div>
          </div>
        </div>
      )}

      {languageOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[70] flex items-center justify-center">
            <button
              type="button"
              aria-label={t("headerLanguageCloseLabel")}
              className="absolute inset-0 bg-black/60"
              onClick={() => setLanguageOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-[90%] max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--foreground)] shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">{t("headerLanguageLabel")}</h2>
              <button
                type="button"
                className="rounded-full p-1 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                onClick={() => setLanguageOpen(false)}
                aria-label={t("productCloseLabel")}
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {SUPPORTED_LOCALES.map((value) => {
                const meta = LOCALE_META[value];
                const isActive = value === locale;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleLocaleSelect(value)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "border-[var(--primary)] bg-[var(--primary)]/10"
                        : "border-[var(--border)] hover:bg-[var(--surface-veil)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg" aria-hidden="true">
                        {meta.flag}
                      </span>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">{meta.label}</p>
                        <p className="text-xs uppercase text-[var(--muted)]">{value}</p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-xs font-semibold text-[var(--primary)]">
                        {t("headerLanguageActive")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
