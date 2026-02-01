"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/mocks/products";
import { ProductDetailModal } from "@/components/ProductDetailModal";

type Props = {
  product: Product;
};

export function ProductDetailModalRoute({ product }: Props) {
  const router = useRouter();

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return <ProductDetailModal product={product} onClose={handleClose} />;
}
