"use client";

import type { ReactNode } from "react";
import { StoreProvider } from "easy-peasy";
import { Toaster } from "react-hot-toast";
import { store } from "@/stores";
import { UiProvider } from "@/components/layout/UiProvider";
import { useOneSignal } from "@/hooks/use-onesignal";
import type { Locale } from "@/i18n/locales";

type AppProvidersProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export function AppProviders({ children, initialLocale }: AppProvidersProps) {
  useOneSignal();

  return (
    <StoreProvider store={store}>
      <Toaster />
      <UiProvider initialLocale={initialLocale}>{children}</UiProvider>
    </StoreProvider>
  );
}
