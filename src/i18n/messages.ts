import type { Locale } from "@/i18n/locales";

const baseMessages = {
  headerTitle: "Focus Shoes",
  headerTagline: "รองเท้าหนังแท้ 100% ราคาโรงงาน",
  headerMenuLabel: "เมนู",
  headerLanguageLabel: "ภาษา",
  headerContactPhone: "โทร: 092-664-4624",
  headerContactAddress:
    "166/95 ถ.จรัญสนิทวงศ์ แขวงบ้านช่างหล่อ เขตบางกอกน้อย กรุงเทพมหานคร 10700",
  headerContactHours: "จันทร์-เสาร์ 9:00-18:00",
  headerContactFacebook: "Facebook: focusshoes.th",
  headerContactLine: "LINE: focusshoes",
  footerTitle: "Focus Shoes",
  footerTagline: "ร้านรองเท้าหนังแท้ คุณภาพดี ราคาโรงงาน",
  footerPhone: "092-664-4624",
  footerLine: "focusshoes",
  footerFacebook: "facebook.com/focusshoes.th",
  footerAddress: "166/95 ถ.จรัญสนิทวงศ์ แขวงบ้านช่างหล่อ เขตบางกอกน้อย กรุงเทพฯ 10700",
  footerHours: "จันทร์-เสาร์ 9:00-18:00 น.",
  footerCopyright: "© 2026 Focus Shoes. All rights reserved.",
} as const;

export type MessageKey = keyof typeof baseMessages;

export const messages: Record<Locale, Record<MessageKey, string>> = {
  th: { ...baseMessages },
  en: { ...baseMessages },
  lo: { ...baseMessages },
};
