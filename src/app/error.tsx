"use client";

import { useTranslations } from "@/i18n/useTranslations";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center text-[var(--foreground)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
        {t("errorLabel")}
      </p>
      <h1 className="mt-3 text-2xl font-semibold">{t("errorTitle")}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {error?.message || t("errorFallback")}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] transition hover:bg-[#9f1c1d]"
        >
          {t("errorRetry")}
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium transition hover:border-white/30"
        >
          {t("errorBackHome")}
        </a>
      </div>
    </main>
  );
}
