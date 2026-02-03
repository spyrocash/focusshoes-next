"use client";

import { ContactInfo } from "@/components/ContactInfo";
import { useTranslations } from "@/i18n/useTranslations";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-8 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-[var(--muted)]">
      <div className="mx-auto max-w-5xl">
        <h4 className="mb-2 font-semibold text-[var(--foreground)]">{t("footerTitle")}</h4>
        <p className="mb-3 text-sm text-[var(--muted)]">{t("footerTagline")}</p>
        <ContactInfo className="text-[var(--muted)]" />
        <div className="mt-4 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
          <p>{t("footerCopyright")}</p>
        </div>
      </div>
    </footer>
  );
}
