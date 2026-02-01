import type { ReactNode } from "react";
import { AwardIcon, ScissorsIcon, ShieldIcon } from "@/components/icons";
import { HomeClient } from "@/features/home/HomeClient";
import { products as catalogProducts } from "@/mocks/products";

export function Home() {
  return (
    <HomeClient products={catalogProducts} hero={<Hero />} footer={<Footer />} />
  );
}

function Hero() {
  return (
    <div className="bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--background)] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)]/60 bg-[var(--primary)]/15 text-lg font-bold text-[var(--primary)]">
            FS
          </div>
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">
            ร้านรองเท้า Focus Shoes
          </h2>
        </div>
        <p className="mb-4 mt-2 max-w-3xl leading-relaxed text-[var(--muted)]">
          จำหน่ายรองเท้าสตรี, ข้าราชการ, พยาบาล ราคาโรงงาน ทั้งปลีกและส่ง หนังแท้100%
          สวมใส่สบาย ไม่มีปัญหาเรื่องปวดเท้า มีให้เลือกหลายสไตล์ สวย คุณภาพดี ที่สำคัญราคาไม่แพง
        </p>

        <div className="grid grid-cols-3 gap-3">
          <Feature icon={<ShieldIcon className="h-6 w-6 text-[var(--primary)]" />} label="หนังแท้ 100%" />
          <Feature icon={<AwardIcon className="h-6 w-6 text-[var(--primary)]" />} label="ประสบการณ์ 20ปี" />
          <Feature icon={<ScissorsIcon className="h-6 w-6 text-[var(--primary)]" />} label="สั่งตัดได้" />
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

function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-[var(--muted)]">
      <div className="mx-auto max-w-5xl text-center">
        <h4 className="mb-2 font-semibold text-[var(--foreground)]">Focus Shoes</h4>
        <p className="mb-3 text-sm text-[var(--muted)]">ร้านรองเท้าหนังแท้ คุณภาพดี ราคาโรงงาน</p>
        <div className="space-y-1 text-sm">
          <p>
            📞{" "}
            <a
              href="tel:+66926644624"
              className="underline-offset-2 hover:underline text-[var(--foreground)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              092-664-4624
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
              focusshoes
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
              facebook.com/focusshoes.th
            </a>
          </p>
          <p>📍 166/95 ถ.จรัญสนิทวงศ์ แขวงบ้านช่างหล่อ เขตบางกอกน้อย กรุงเทพฯ 10700</p>
          <p>⏰ จันทร์-เสาร์ 9:00-18:00 น.</p>
        </div>
        <div className="mt-4 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
          <p>© 2026 Focus Shoes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
