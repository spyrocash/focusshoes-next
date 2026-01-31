"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { products, type Product } from "./data";

export default function ProductCatalog() {
  const [active, setActive] = useState<Product | null>(null);
  const categories = useMemo(
    () => ["ทั้งหมด", ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("ทั้งหมด");

  const filtered = useMemo(() => {
    if (selectedCategory === "ทั้งหมด") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-foreground">
      <GradientLights />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-28 pt-12 sm:px-6 md:px-8">
        <header className="glass soft-glow overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                focus shoes
              </p>
              <h1 className="font-[var(--font-display)] text-3xl text-white sm:text-4xl">
                รองเท้าสตรี หนังแท้ ใส่สบาย
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
                สไตล์จากโทนแดง-ดำ ทันสมัย มีชีวิตชีวา แตะการ์ดสินค้าเพื่อดูรายละเอียดเต็มจอ
                สั่งซื้อ/สั่งตัดได้ทันที
              </p>
              <div className="flex flex-wrap gap-2 text-[12px] text-white/80">
                <Badge>หนังแท้ 100%</Badge>
                <Badge>พื้นนุ่มรับแรงกระแทก</Badge>
                <Badge>ราคาจากโรงงาน</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-white/80">
              <Feature label="หนังแท้" />
              <Feature label="ประสบการณ์ 20 ปี" />
              <Feature label="สั่งตัดได้" />
            </div>
          </div>
        </header>

        <section className="glass rounded-3xl border border-white/10 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                catalog
              </p>
              <h2 className="font-[var(--font-display)] text-2xl text-white">
                สินค้าแนะนำ ({filtered.length})
              </h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_10px_30px_rgba(200,38,39,0.35)]"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-[var(--accent)] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2"
            id="products"
          >
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1f1c1d] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                onClick={() => setActive(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(product);
                  }
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-45 transition duration-500 group-hover:opacity-75`}
                />
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 320px"
                    priority={product.id === "aurora-softstep"}
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                        สินค้าหมด
                      </span>
                    </div>
                  )}
                </div>
                <div className="relative space-y-2 border-t border-white/10 px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
                        {product.category}
                      </p>
                      <h3 className="font-[var(--font-display)] text-lg text-white line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white text-black px-3 py-1 text-xs font-semibold">
                      ฿{product.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[12px] text-white/80">
                    <Rating rating={product.rating} />
                    <div className="flex gap-1">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass rounded-3xl border border-white/10 p-6 text-center sm:p-8">
          <h3 className="font-[var(--font-display)] text-2xl text-white">
            สั่งตัดรองเท้าในแบบของคุณ
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            ปรับสี หนัง ส้น และแผ่นรอง รับงานด่วนตามคิว ผลิต 7-10 วัน
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="/contact"
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(200,38,39,0.45)]"
            >
              ติดต่อสั่งตัด
            </a>
            <a
              href="https://line.me/R/ti/p/@focusshoes"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              แชท LINE
            </a>
          </div>
        </section>
      </main>

      <BottomBar />
      {active && <ProductModal product={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function Feature({ label }: { label: string }) {
  return (
    <div className="glass rounded-2xl border border-white/10 px-4 py-3">
      <span className="text-[11px] font-semibold">{label}</span>
    </div>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center sm:justify-center">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur"
        onClick={onClose}
      />
      <div className="relative z-50 flex h-screen w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/12 bg-[#181617] sm:h-[92vh] sm:rounded-3xl">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
              focus shoes
            </p>
            <h2 className="font-[var(--font-display)] text-2xl text-white">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="ปิดหน้ารายละเอียดสินค้า"
          >
            ปิด
          </button>
        </header>

        <div className="grid flex-1 grid-rows-[auto_1fr_auto] overflow-y-auto">
          <ImageCarousel product={product} />

          <div className="space-y-5 p-6">
            <p className="text-sm leading-7 text-[var(--muted)]">
              {product.description}
            </p>
            <ul className="grid gap-2 text-sm text-white/90 sm:grid-cols-2">
              {product.details.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                ราคาโรงงาน
              </p>
              <p className="text-xl font-semibold text-white">฿{product.price}</p>
            </div>
            <div className="flex gap-2">
              <a
                href="https://line.me/R/ti/p/@focusshoes"
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(200,38,39,0.45)]"
              >
                แชทสั่งซื้อ
              </a>
              <a
                href="tel:+66800000000"
                className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                โทรสอบถาม
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % product.images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + product.images.length) % product.images.length);

  return (
    <div className="relative h-80 border-b border-white/10 bg-[#1f1c1d]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-55`}
      />
      <Image
        src={product.images[index]}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width:768px) 100vw, 640px"
        priority
      />
      {product.images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black/80"
            aria-label="ภาพก่อนหน้า"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black/80"
            aria-label="ภาพถัดไป"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? "bg-[var(--accent)]" : "bg-white/40"
                }`}
                aria-label={`ภาพที่ ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BottomBar() {
  return (
    <nav className="glass fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/70 px-6 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between text-sm font-semibold">
        <a
          href="/products"
          className="flex flex-1 items-center justify-center gap-2 text-[var(--accent)]"
        >
          <ShoeIcon />
          สินค้า
        </a>
        <div className="mx-4 h-8 w-px bg-white/10" />
        <a
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2 text-white"
        >
          <ChatIcon />
          ติดต่อ
        </a>
      </div>
    </nav>
  );
}

function Rating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rounded ? "text-[var(--accent)]" : "text-white/30"}
        >
          ★
        </span>
      ))}
      <span className="text-[11px] text-[var(--muted)]">{rating.toFixed(1)}</span>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[12px] text-white/80">
      <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_rgba(200,38,39,0.15)]" />
      {children}
    </span>
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

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[var(--accent)] shrink-0"
    >
      <path
        d="m5 12 4 4 10-10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShoeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 14.5c1.5.5 3.5.5 6.5-2l2 1c1.5 1 3 .7 5.5-.5V16c0 1.7-1.3 3-3 3H6a2 2 0 0 1-2-2v-2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 13.5c1 0 2.5-1 4-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 18v3.5l3.5-3.5H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
