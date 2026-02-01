import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UiProvider } from "@/components/layout/UiProvider";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, modal, params }: LayoutProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return (
    <UiProvider initialLocale={locale}>
      <Header />
      {children}
      <Footer />
      {modal}
    </UiProvider>
  );
}
