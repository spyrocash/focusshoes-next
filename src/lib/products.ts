import type { Product } from "@/mocks/products";
import { products } from "@/mocks/products";

export const allProducts = products;

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
