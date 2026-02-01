"use client";

import type { ReactNode } from "react";
import { AwardIcon, ScissorsIcon, ShieldIcon } from "@/components/icons";
import { HomeClient } from "@/features/home/HomeClient";
import { products as catalogProducts } from "@/mocks/products";
import { useTranslations } from "@/i18n/useTranslations";

export function Home() {
  return (
    <HomeClient products={catalogProducts} hero={<Hero />} />
  );
}

function Hero() {
  const t = useTranslations();

  return (
    <div className="bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--background)] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)]/60 bg-[var(--primary)]/15 text-lg font-bold text-[var(--primary)]">
            FS
          </div>
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">{t("heroTitle")}</h2>
        </div>
        <p className="mb-4 mt-2 max-w-3xl leading-relaxed text-[var(--muted)]">
          {t("heroDescription")}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <Feature
            icon={<ShieldIcon className="h-6 w-6 text-[var(--primary)]" />}
            label={t("featureLeather")}
          />
          <Feature
            icon={<AwardIcon className="h-6 w-6 text-[var(--primary)]" />}
            label={t("featureExperience")}
          />
          <Feature
            icon={<ScissorsIcon className="h-6 w-6 text-[var(--primary)]" />}
            label={t("featureCustom")}
          />
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <div className="mx-auto mb-1 w-fit">{icon}</div>
      <p className="text-xs font-medium text-[var(--foreground)]">{label}</p>
    </div>
  );
}
