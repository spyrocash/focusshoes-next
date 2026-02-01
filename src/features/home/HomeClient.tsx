"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  ClockIcon,
  FacebookIcon,
  LineIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/mocks/products";

type HomeClientProps = {
  products: Product[];
  hero: ReactNode;
  footer: ReactNode;
};

export function HomeClient({ products, hero, footer }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = useMemo(
    () => [
      { id: "all", name: "ทั้งหมด" },
      ...Array.from(new Set(products.map((p) => p.category))).map((c) => ({
        id: c,
        name: c,
      })),
    ],
    [products],
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (p) => p.category === categories.find((c) => c.id === selectedCategory)?.name,
    );
  }, [selectedCategory, products, categories]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {hero}
      <CategoryFilter
        menuOpen={menuOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <main className="mx-auto max-w-5xl py-2">
        <div className="mb-2 flex items-center justify-between px-4 sm:px-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              สินค้าทั้งหมด ({filteredProducts.length})
            </h3>
          </div>
          <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)] sm:inline-flex">
            Focus Shoes · leather 100%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 px-1 sm:grid-cols-3 md:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              rating={product.rating}
              image={product.images[0]}
              inStock={product.inStock}
              priority={index < 4}
              href={`/products/${product.id}`}
            />
          ))}
        </div>
      </main>
      {footer}
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

function CategoryFilter({
  menuOpen,
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  menuOpen: boolean;
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  categories: { id: string; name: string }[];
}) {
  const headerHeight = 68;
  const subHeaderHeight = 177;

  const top = menuOpen ? headerHeight + subHeaderHeight : headerHeight;

  return (
    <div
      className="sticky z-50 border-b border-[var(--border)] bg-[var(--surface-veil)] backdrop-blur"
      style={{ top }}
    >
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
