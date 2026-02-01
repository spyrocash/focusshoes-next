"use client";

import { useMemo, useState } from "react";
import {
  AwardIcon,
  ClockIcon,
  FacebookIcon,
  LineIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  ScissorsIcon,
  ShieldIcon,
  XIcon,
} from "./icons";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { products as catalogProducts, type Product } from "@/components/products/data";

const categories = [
  { id: "all", name: "ทั้งหมด" },
  ...Array.from(new Set(catalogProducts.map((p) => p.category))).map((c) => ({
    id: c,
    name: c,
  })),
];

const products: Product[] = catalogProducts;

export function ExampleApp() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (p) => p.category === categories.find((c) => c.id === selectedCategory)?.name,
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <CategoryFilter
        menuOpen={menuOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <main className="mx-auto max-w-5xl py-2">
        <div className="mb-2 flex items-center justify-between px-4 sm:px-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              สินค้าทั้งหมด ({filteredProducts.length})
            </h3>
            {/* <p className="text-sm text-[var(--muted)]">โทนแดงดำ ทันสมัย สั่งตัดได้</p> */}
          </div>
          <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)] sm:inline-flex">
            Focus Shoes · leather 100%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 px-1">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              rating={product.rating}
              image={product.images[0]}
              inStock={product.inStock}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </main>
      {/* <TailorCTA /> */}
      <Footer />
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface-veil)] text-[var(--foreground)] shadow-lg backdrop-blur">
      <div className="px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Focus Shoes</h1>
            <p className="text-xs text-[var(--muted)]">รองเท้าหนังแท้ 100% ราคาโรงงาน</p>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-[var(--primary)]/10"
            aria-label="toggle menu"
          >
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 sm:px-6">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-[var(--primary)]" />
              <a
                href="tel:+66926644624"
                className="underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                โทร: 092-664-4624
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-[var(--primary)]" />
              <span>
                166/95 ถ.จรัญสนิทวงศ์ แขวงบ้านช่างหล่อ เขตบางกอกน้อย กรุงเทพมหานคร 10700
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-[var(--primary)]" />
              <span>จันทร์-เสาร์ 9:00-18:00</span>
            </div>
            <div className="flex items-center gap-2">
              <FacebookIcon className="h-4 w-4 text-[var(--primary)]" />
              <a
                href="https://www.facebook.com/focusshoes.th"
                className="underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook: focusshoes.th
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LineIcon className="h-4 w-4 text-[var(--primary)]" />
              <a
                href="https://line.me/R/ti/p/focusshoes"
                className="underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINE: focusshoes
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
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

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <div className="mx-auto mb-1 w-fit">{icon}</div>
      <p className="text-xs font-medium text-[var(--foreground)]">{label}</p>
    </div>
  );
}

function CategoryFilter({
  menuOpen,
  selectedCategory,
  setSelectedCategory,
}: {
  menuOpen: boolean;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}) {
  const headerHeight = 68;
  const subHeaderHeight = 177;

  const top = menuOpen ? headerHeight + subHeaderHeight : headerHeight;

  return (
    <div className="sticky z-50 border-b border-[var(--border)] bg-[var(--surface-veil)] backdrop-blur" style={{ top }}>
      <div className="mx-auto max-w-5xl">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap rounded-full px-4 py-1 text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--surface-veil)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TailorCTA() {
  return (
    <div className="mt-8 bg-gradient-to-br from-[var(--primary)] to-[#8d1516] px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <h3 className="mb-2 text-xl font-bold">สั่งตัดรองเท้าในแบบของคุณ</h3>
        <p className="mb-4 text-sm text-white/80">
          รองเท้า Focus Shoes ผลิตและจัดจำหน่ายมากว่า 20ปี
          จึงมั่นใจได้ในคุณภาพว่าดีจริง! คู่ควรสำหรับคุณ
        </p>
        <a
          href="/contact"
          className="inline-block rounded-full bg-white px-6 py-3 font-medium text-[var(--primary)] shadow-lg transition-colors hover:bg-gray-100"
        >
          ติดต่อสั่งซื้อ
        </a>
      </div>
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
