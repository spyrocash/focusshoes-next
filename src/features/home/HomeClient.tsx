"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/mocks/products";
import { useUi } from "@/components/layout/UiProvider";
import { useTranslations } from "@/i18n/useTranslations";

type HomeClientProps = {
  products: Product[];
  hero: ReactNode;
};

export function HomeClient({ products, hero }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { menuOpen, locale } = useUi();
  const t = useTranslations();

  const categories = useMemo(
    () => [
      { id: "all", name: t("homeAllCategory") },
      ...Array.from(new Set(products.map((p) => p.category))).map((c) => ({
        id: c,
        name: c,
      })),
    ],
    [products, t],
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (p) => p.category === categories.find((c) => c.id === selectedCategory)?.name,
    );
  }, [selectedCategory, products, categories]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
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
              {t("homeAllProductsTitle")} ({filteredProducts.length})
            </h3>
          </div>
          <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)] sm:inline-flex">
            {t("homeBadge")}
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
              href={`/${locale}/products/${product.id}`}
            />
          ))}
        </div>
      </main>
    </div>
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
