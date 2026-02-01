import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden text-foreground">
      <GradientLights />
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-20 pt-12 sm:px-6 md:px-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            focus shoes
          </p>
          <h1 className="font-[var(--font-display)] text-3xl text-white sm:text-4xl">
            ติดต่อร้าน / สั่งซื้อ / สั่งตัด
          </h1>
          <p className="text-sm leading-6 text-[var(--muted)] sm:text-base">
            แนะนำรุ่นที่เหมาะกับรูปเท้าคุณ รับทั้งปลีกและราคาส่ง พร้อมบริการสั่งตัด
            ส่งทั่วไทย
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="glass rounded-3xl border border-white/10 p-6 sm:p-7">
            <h2 className="font-[var(--font-display)] text-xl text-white">
              ช่องทางติดต่อ
            </h2>
            <div className="mt-4 space-y-4 text-sm text-[var(--muted)]">
              <ContactRow label="LINE">
                <a
                  href="https://line.me/R/ti/p/@FocusShoes"
                  className="text-white underline decoration-[var(--accent)] underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FocusShoes
                </a>
              </ContactRow>
              <ContactRow label="โทร">
                <a
                  href="tel:+66926644624"
                  className="text-white underline decoration-[var(--accent)] underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  092-664-4624
                </a>{" "}
                ทุกวัน 09.00-19.00
              </ContactRow>
              <ContactRow label="Facebook">
                <Link
                  href="https://www.facebook.com/focusshoes.th"
                  className="text-white underline decoration-[var(--accent)] underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  facebook.com/focusshoes.th
                </Link>
              </ContactRow>
              <ContactRow label="ที่อยู่โชว์รูม">
                166/95 ถ.จรัญสนิทวงศ์ แขวงบ้านช่างหล่อ เขตบางกอกน้อย กรุงเทพมหานคร 10700
              </ContactRow>
              <ContactRow label="บริการ">
                ปลีก/ส่ง รองเท้าเบิกจ่ายราชการ รองเท้าแพทย์/พยาบาล บริการสั่งตัด
                วัดเท้า นัดหมาย onsite สำหรับองค์กร
              </ContactRow>
              <ContactRow label="การจัดส่ง">
                จัดส่งทั่วไทย ภายใน 1-3 วันทำการ (สินค้าพร้อมส่ง)
                และสั่งตัด 7-10 วัน
              </ContactRow>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://line.me/R/ti/p/@FocusShoes"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(200,38,39,0.45)]"
              >
                แชททาง LINE
              </a>
              <a
                href="tel:+66926644624"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                โทรหาทีมขาย
              </a>
            </div>
          </div>

          <div className="glass rounded-3xl border border-white/10 p-6 sm:p-7 space-y-4">
            <h2 className="font-[var(--font-display)] text-xl text-white">
              เกี่ยวกับร้าน
            </h2>
            <p className="text-sm leading-6 text-[var(--muted)]">
              Focus Shoes ผลิตและจำหน่ายรองเท้าสตรี หนังแท้ 100% มากว่า 20 ปี
              มุ่งเน้นความนิ่ม ใส่สบาย เหมาะกับงานราชการ งานแพทย์/พยาบาล
              และบริการสั่งตัดเฉพาะบุคคล
            </p>
            <ul className="space-y-2 text-sm text-white/85">
              <li className="flex items-center gap-2">
                <DotIcon /> รับประกันความพึงพอใจ 14 วัน
              </li>
              <li className="flex items-center gap-2">
                <DotIcon /> ส่งตรงจากโรงงาน ราคาปลีกและส่ง
              </li>
              <li className="flex items-center gap-2">
                <DotIcon /> นัดวัดเท้า/ onsite สำหรับองค์กร
              </li>
            </ul>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[var(--muted)]">
              เปิดทุกวัน 09.00-19.00 <br />
              ตอบแชทภายใน 10 นาที (เวลาทำการ)
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
              พร้อมให้คำปรึกษาเรื่องสรีระเท้าและการเลือกพื้นรองรับ
            </div>
          </div>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="min-w-[82px] text-white/70">{label}</span>
      <span>{children}</span>
    </div>
  );
}

function GradientLights() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--accent)]/22 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12%] top-1/3 h-80 w-80 rounded-full bg-[#ff8f7a]/16 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-1/4 h-72 w-72 rounded-full bg-[#5d2323]/18 blur-3xl" />
    </>
  );
}

function BottomBar() {
  return (
    <nav className="glass fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/70 px-6 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between text-sm font-semibold">
        <a
          href="/products"
          className="flex flex-1 items-center justify-center gap-2 text-white"
        >
          สินค้า
        </a>
        <div className="mx-4 h-8 w-px bg-white/10" />
        <a
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2 text-[var(--accent)]"
        >
          ติดต่อ
        </a>
      </div>
    </nav>
  );
}

function DotIcon() {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[var(--accent)]"
    >
      <circle cx="3" cy="3" r="3" fill="currentColor" />
    </svg>
  );
}
