import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductDetailModalRoute } from "@/features/products/ProductDetailModalRoute";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(decodeURIComponent(id));

  if (!product) {
    notFound();
  }

  return <ProductDetailModalRoute product={product} />;
}
