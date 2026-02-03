"use client";

import type { Product } from "@/mocks/products";
import { ProductDetailContent } from "./ProductDetailContent";

type Props = {
  product: Product;
  onClose: () => void;
};

export function ProductDetailModal({ product, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} />

      <div className="relative h-full w-full overflow-y-auto border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[0_24px_60px_rgba(0,0,0,0.35)] lg:h-[90vh] lg:w-[min(1024px,92vw)] lg:rounded-3xl">
        <ProductDetailContent product={product} onClose={onClose} />
      </div>
    </div>
  );
}
