import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";

type Params = {
  id: string;
};

type PageProps = {
  params: Promise<Params>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(decodeURIComponent(id));

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
