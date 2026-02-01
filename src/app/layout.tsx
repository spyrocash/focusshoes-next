import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Kanit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";

const THEME: "dark" | "light" = "dark"; // เปลี่ยนค่าเป็น "light" ได้จากโค้ดเพื่อสลับธีม

const display = Kanit({
  variable: "--font-display",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700", "800"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Focus Shoes | รองเท้าสตรีคุณภาพ หนังแท้ ใส่สบาย",
  description:
    "Focus Shoes ร้านรองเท้าสตรี หนังแท้ 100% ใส่สบาย รองรับงานราชการ พยาบาล ทั้งปลีกและส่ง พร้อมสั่งตัดเฉพาะคุณ",
  keywords: [
    "รองเท้าสตรี",
    "รองเท้าหนังแท้",
    "รองเท้าราชการ",
    "รองเท้าพยาบาล",
    "โรงงานรองเท้า",
    "Focus Shoes",
  ],
  metadataBase: new URL("http://www.focusshoes-th.com/"),
  openGraph: {
    title: "Focus Shoes | รองเท้าสตรีหนังแท้ ใส่สบาย",
    description: "รองเท้าผู้หญิงหนังแท้จากโรงงาน Focus Shoes สวย สุภาพ ใส่สบาย สั่งตัดได้ตรงใจ",
    url: "http://www.focusshoes-th.com/",
    siteName: "Focus Shoes",
    images: [
      {
        url: "/logo_focusshoes_1-1.jpg",
        width: 1200,
        height: 630,
        alt: "Focus Shoes catalog",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Shoes | รองเท้าสตรีหนังแท้",
    description: "สวย ใส่สบาย ราคาโรงงาน พร้อมสั่งตัดเฉพาะคุณ",
    images: ["/logo_focusshoes_1-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="th">
      <body data-theme={THEME} className={`${display.variable} ${sans.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
