"use client";

import { useMemo } from "react";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { messages, type MessageKey } from "@/i18n/messages";
import { useUi } from "@/components/layout/UiProvider";

export function useTranslations() {
  const { locale } = useUi();

  return useMemo(() => {
    return (key: MessageKey) => {
      const localMessages = messages[locale] ?? messages[DEFAULT_LOCALE];
      return localMessages[key] ?? messages[DEFAULT_LOCALE][key] ?? key;
    };
  }, [locale]);
}
