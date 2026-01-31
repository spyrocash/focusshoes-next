import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertProduct, type Product, type ProductQueryParams } from "@shared/schema";
import { PRODUCTS } from "@/mock/products";

// Pre-shape mock data to align with the Product type
const MOCK_PRODUCTS: Product[] = PRODUCTS.map((item, idx) => ({
  id: idx + 1,
  createdAt: new Date("2024-01-01"),
  ...item,
}));

function filterProducts(params?: ProductQueryParams) {
  if (!params) return MOCK_PRODUCTS;

  const searchTerm = params.search?.toLowerCase().trim();
  return MOCK_PRODUCTS.filter(product => {
    const matchesCategory = params.category ? product.category === params.category : true;
    const matchesMin = params.minPrice !== undefined ? product.retailPrice >= params.minPrice : true;
    const matchesMax = params.maxPrice !== undefined ? product.retailPrice <= params.maxPrice : true;
    const matchesTags = params.tags?.length
      ? params.tags.every(tag => product.tags?.includes(tag))
      : true;
    const matchesSearch = searchTerm
      ? [product.nameTH, product.category, product.slug, ...(product.tags ?? [])]
          .some(text => text.toLowerCase().includes(searchTerm))
      : true;

    return matchesCategory && matchesMin && matchesMax && matchesTags && matchesSearch;
  });
}

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: ["mock-products", params],
    queryFn: async () => filterProducts(params),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["mock-product", slug],
    queryFn: async () => MOCK_PRODUCTS.find(product => product.slug === slug) ?? null,
    enabled: !!slug,
  });
}

// For internal/admin use mainly, but included for completeness
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertProduct) => {
      const res = await fetch(api.products.create.path, {
        method: api.products.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.products.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create product");
      }
      return api.products.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.products.list.path] });
    },
  });
}
