"use client";

import Image from "next/image";

export type ProductCardProps = {
  id: string;
  name: string;
  category: string;
  price: number | string;
  rating: number;
  image: string;
  inStock: boolean;
  priority?: boolean;
  onClick?: () => void;
};

export function ProductCard({
  name,
  price,
  image,
  inStock,
  priority = false,
  onClick,
}: ProductCardProps) {
  const priceDisplay = Number(price).toLocaleString("th-TH");
  return (
    <div
      // className="cursor-pointer overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_32px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      className="cursor-pointer overflow-hidden"
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
      <div className="relative aspect-7/8 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width:768px) 50vw, 300px"
          className="object-cover transition-transform duration-500 hover:scale-[1.1]"
          priority={priority}
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-red-600 px-3 py-1 font-medium text-white">
              สินค้าหมด
            </span>
          </div>
        )}
      </div>
      <div className="p-1 text-[var(--foreground)]">
        <h3 className="line-clamp-2 text-sm font-medium text-[var(--foreground)]">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-medium font-semibold text-[var(--primary)]">
            ฿{priceDisplay}
          </span>
        </div>
      </div>
    </div>
  );
}
