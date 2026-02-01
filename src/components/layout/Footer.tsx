"use client";

import { useTranslations } from "@/i18n/useTranslations";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-8 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-[var(--muted)]">
      <div className="mx-auto max-w-5xl text-center">
        <h4 className="mb-2 font-semibold text-[var(--foreground)]">{t("footerTitle")}</h4>
        <p className="mb-3 text-sm text-[var(--muted)]">{t("footerTagline")}</p>
        <div className="space-y-1 text-sm">
          <p>
            📞{" "}
            <a
              href="tel:+66926644624"
              className="underline-offset-2 hover:underline text-[var(--foreground)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footerPhone")}
            </a>
          </p>
          <p>
            💬 LINE:{" "}
            <a
              href="https://line.me/R/ti/p/focusshoes"
              className="underline-offset-2 hover:underline text-[var(--foreground)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footerLine")}
            </a>
          </p>
          <p>
            f:{" "}
            <a
              href="https://www.facebook.com/focusshoes.th"
              className="underline-offset-2 hover:underline text-[var(--foreground)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footerFacebook")}
            </a>
          </p>
          <p>📍 {t("footerAddress")}</p>
          <p>⏰ {t("footerHours")}</p>
        </div>
        <div className="mt-4 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
          <p>{t("footerCopyright")}</p>
        </div>
      </div>
    </footer>
  );
}
