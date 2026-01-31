"use client";

import Image from "next/image";
import { ShoppingCartIcon, StarIcon } from "./icons";

export type ProductCardProps = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
  onClick?: () => void;
};

export function ProductCard({
  name,
  category,
  price,
  rating,
  image,
  inStock,
  onClick,
}: ProductCardProps) {
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_32px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width:768px) 50vw, 300px"
          className="object-cover"
          priority
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-red-600 px-3 py-1 font-medium text-white">
              สินค้าหมด
            </span>
          </div>
        )}
      </div>
      <div className="p-3 text-[var(--foreground)]">
        {/* <div className="mb-1 text-xs text-[var(--muted)]">{category}</div> */}
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-[var(--foreground)]">
          {name}
        </h3>
        {/* <div className="mb-2 flex items-center gap-1 text-[var(--muted)]">
          {[...Array(5)].map((_, i) => {
            const filled = i < rating;
            return (
              <StarIcon
                key={i}
                className={`h-3 w-3 ${
                  filled ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            );
          })}
          <span className="ml-1 text-xs text-gray-600">({rating}.0)</span>
        </div> */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-[var(--primary)]">
            ฿{price.toLocaleString()}
          </span>
          {/* <button
            className="rounded-full bg-[var(--primary)] p-2 text-white transition-colors hover:bg-[#9f1c1d] disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={!inStock}
            aria-label="เพิ่มลงตะกร้า"
          >
            <ShoppingCartIcon className="h-4 w-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
