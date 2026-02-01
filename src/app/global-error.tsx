"use client";

import { useTranslations } from "@/i18n/useTranslations";
import { UiProvider } from "@/components/layout/UiProvider";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="th">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <UiProvider>
          <GlobalErrorContent error={error} reset={reset} />
        </UiProvider>
      </body>
    </html>
  );
}

function GlobalErrorContent({ error, reset }: GlobalErrorProps) {
  const t = useTranslations();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
        {t("globalErrorLabel")}
      </p>
      <h1 className="mt-3 text-2xl font-semibold">{t("globalErrorTitle")}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {error?.message || t("globalErrorFallback")}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] transition hover:bg-[#9f1c1d]"
      >
        {t("globalErrorRetry")}
      </button>
    </main>
  );
}
