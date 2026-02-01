"use client";

import type { Product } from "@/mocks/products";
import { ProductDetailContent } from "@/components/ProductDetailContent";

type Props = {
  product: Product;
};

export function ProductDetailPage({ product }: Props) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main>
        <ProductDetailContent product={product} />
      </main>
    </div>
  );
}
