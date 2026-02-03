import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppProviders } from "@/components/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, modal, params }: LayoutProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  return (
    <AppProviders initialLocale={locale as Locale}>
      <Header />
      {children}
      <Footer />
      {modal}
    </AppProviders>
  );
}
